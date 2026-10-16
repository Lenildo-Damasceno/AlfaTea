import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("catálogo de áudio tem arquivos PCM válidos, não vazios e identificadores únicos", () => {
  const pasta = new URL("../assets/audio/", import.meta.url);
  const catalogo = JSON.parse(readFileSync(new URL("catalog.json", pasta), "utf8"));
  const ids = new Set();
  for (const item of catalogo.gravacoes) {
    assert.ok(!ids.has(item.id)); ids.add(item.id);
    assert.equal(typeof item.revisado, "boolean");
    const arquivo = readFileSync(new URL(`${item.id}.wav`, pasta));
    assert.equal(arquivo.toString("ascii", 0, 4), "RIFF");
    assert.equal(arquivo.toString("ascii", 8, 12), "WAVE");
    let formato = false;
    let dados = false;
    for (let offset = 12; offset + 8 <= arquivo.length;) {
      const tipo = arquivo.toString("ascii", offset, offset + 4);
      const tamanho = arquivo.readUInt32LE(offset + 4);
      const inicio = offset + 8;
      assert.ok(inicio + tamanho <= arquivo.length);
      if (tipo === "fmt ") {
        assert.equal(arquivo.readUInt16LE(inicio), 1);
        assert.equal(arquivo.readUInt16LE(inicio + 2), 1);
        assert.equal(arquivo.readUInt32LE(inicio + 4), 24000);
        assert.equal(arquivo.readUInt16LE(inicio + 14), 16);
        formato = true;
      }
      if (tipo === "data") {
        assert.ok(tamanho > 4800, `${item.id}: duração curta demais`);
        assert.ok(arquivo.subarray(inicio, inicio + tamanho).some((valor) => valor !== 0), `${item.id}: silêncio`);
        dados = true;
      }
      offset = inicio + tamanho + tamanho % 2;
    }
    assert.ok(formato && dados, item.id);
  }
  assert.equal(ids.size, 36);
});
