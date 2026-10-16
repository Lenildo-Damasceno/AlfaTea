import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { criarRepositorio } from "../src/services/learningRepository.js";
import { criarArmazenamentoSQLite } from "../src/services/learningDatabase.js";
import { caminhoContinuar } from "../src/data/learningModel.js";
import { criarAtividade, VOGAIS } from "../src/data/letterActivity.js";

function abrirRepositorio(caminho = ":memory:") {
  const db = new DatabaseSync(caminho);
  const armazenamento = criarArmazenamentoSQLite(async () => ({
    execAsync: async (sql) => db.exec(sql),
    getFirstAsync: async (sql, ...parametros) => db.prepare(sql).get(...parametros),
    runAsync: async (sql, ...parametros) => db.prepare(sql).run(...parametros),
  }));
  return { db, armazenamento, repositorio: criarRepositorio(armazenamento) };
}
const visita = (letra, perfilId = "principal", modulo = "letras") => ({ tipo: "visita", perfilId, letra, modulo });
const resposta = (acertou, perfilId = "principal") => ({ tipo: "resposta", perfilId, letra: "A", acertou, data: "2026-10-15T12:00:00Z" });

test("reabrir o banco preserva visitas, tentativas, perfis e separação entre contas", async () => {
  const caminho = join(tmpdir(), `alfatea-test-${randomUUID()}.db`);
  let banco = abrirRepositorio(caminho);
  try {
    await banco.repositorio.atualizar("conta-1", visita("A"));
    await banco.repositorio.atualizar("conta-1", visita("A"));
    await banco.repositorio.atualizar("conta-1", resposta(false));
    await banco.repositorio.atualizar("conta-1", resposta(true));
    await banco.repositorio.atualizar("conta-1", { tipo: "perfil", perfilId: "ana", apelido: "Ana", avatar: "gato" });
    await banco.repositorio.atualizar("conta-1", visita("B", "ana", "silabas"));
    await banco.repositorio.atualizar("conta-2", visita("Z"));
    banco.db.close();
    banco = abrirRepositorio(caminho);
    const um = await banco.repositorio.carregar("conta-1");
    const dois = await banco.repositorio.carregar("conta-2");
    assert.equal(um.perfilAtivo, "ana");
    assert.equal(um.perfis[1].apelido, "Ana");
    assert.deepEqual(um.progresso.principal.letras, ["A"]);
    assert.deepEqual(um.progresso.ana.silabas, ["B"]);
    assert.equal(um.progresso.principal.respostas.A.tentativas, 2);
    assert.equal(um.progresso.principal.respostas.A.acertos, 1);
    assert.deepEqual(dois.progresso.principal.letras, ["Z"]);
    assert.equal(dois.perfis.length, 1);
    assert.equal(caminhoContinuar(um.progresso.ana.ultima), "/syllables/B");
  } finally { banco.db.close(); unlinkSync(caminho); }
});

test("30 respostas simultâneas são salvas sem perder atualizações", async () => {
  const { db, repositorio } = abrirRepositorio();
  try {
    await Promise.all(Array.from({ length: 30 }, (_, i) => repositorio.atualizar("conta", resposta(i % 2 === 0))));
    const estado = await repositorio.carregar("conta");
    assert.equal(estado.progresso.principal.respostas.A.tentativas, 30);
    assert.equal(estado.progresso.principal.respostas.A.acertos, 15);
  } finally { db.close(); }
});

test("falha ao gravar permite nova tentativa sem duplicar a resposta", async () => {
  const banco = abrirRepositorio();
  let falhar = true;
  const repositorio = criarRepositorio({ ...banco.armazenamento, async salvar(...argumentos) {
    if (falhar) { falhar = false; throw new Error("Disco indisponível"); }
    return banco.armazenamento.salvar(...argumentos);
  } });
  try {
    await assert.rejects(repositorio.atualizar("conta", resposta(true)));
    await repositorio.atualizar("conta", resposta(true));
    assert.equal((await repositorio.carregar("conta")).progresso.principal.respostas.A.tentativas, 1);
  } finally { banco.db.close(); }
});

test("dados ilegíveis e versões futuras são preservados em vez de sobrescritos", async () => {
  const banco = abrirRepositorio();
  try {
    for (const valor of ["{inválido", '{"versao":99}']) {
      await banco.armazenamento.salvar("conta", valor);
      await assert.rejects(banco.repositorio.atualizar("conta", visita("A")));
      assert.equal(await banco.armazenamento.ler("conta"), valor);
    }
  } finally { banco.db.close(); }
});

test("a atividade apresenta cada vogal uma vez e três opções únicas por rodada", () => {
  for (const inicio of [...VOGAIS, "inválido"]) {
    const rodadas = criarAtividade(inicio, () => 0.25);
    assert.deepEqual(rodadas.map((item) => item.letra).sort(), [...VOGAIS].sort());
    for (const rodada of rodadas) {
      assert.equal(rodada.opcoes.length, 3);
      assert.equal(new Set(rodada.opcoes).size, 3);
      assert.ok(rodada.opcoes.includes(rodada.letra));
    }
    assert.equal(rodadas[0].letra, VOGAIS.includes(inicio) ? inicio : "A");
  }
});

test("retomar não aceita caminhos arbitrários nem cria rotas inválidas", () => {
  assert.equal(caminhoContinuar(null), "/learn");
  assert.equal(caminhoContinuar({ modulo: "letras", letra: "../login" }), "/learn");
  assert.equal(caminhoContinuar({ modulo: "outro", letra: "A" }), "/learn");
  assert.equal(caminhoContinuar({ modulo: "atividade", letra: "E" }), "/activity?letter=E");
});
