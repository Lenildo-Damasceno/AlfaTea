import { atualizarAprendizagem, novaConta } from "../data/learningModel.js";

// Serializa leitura + escrita para que toques rápidos não percam respostas.
export function criarRepositorio(armazenamento) {
  const filas = new Map();
  function enfileirar(contaId, operacao) {
    if (!contaId) return Promise.reject(new Error("Entre na conta para salvar."));
    const anterior = filas.get(contaId) || Promise.resolve();
    const atual = anterior.then(operacao);
    const fila = atual.catch(() => {});
    filas.set(contaId, fila);
    void fila.then(() => { if (filas.get(contaId) === fila) filas.delete(contaId); });
    return atual;
  }
  async function ler(contaId) {
    const salvo = await armazenamento.ler(contaId);
    if (!salvo) return novaConta();
    const estado = JSON.parse(salvo);
    if (estado.versao !== 1 || !Array.isArray(estado.perfis) || !estado.progresso ||
      !estado.perfis.some((perfil) => perfil.id === estado.perfilAtivo)) {
      throw new Error("Não foi possível ler o progresso salvo. Seus dados foram preservados.");
    }
    return estado;
  }
  return {
    carregar: (contaId) => enfileirar(contaId, () => ler(contaId)),
    atualizar: (contaId, acao) => enfileirar(contaId, async () => {
      const estado = atualizarAprendizagem(await ler(contaId), acao);
      await armazenamento.salvar(contaId, JSON.stringify(estado));
      return estado;
    }),
  };
}
