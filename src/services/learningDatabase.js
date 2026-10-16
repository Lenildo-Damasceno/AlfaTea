// A abertura é injetada para testar persistência e consultas também fora do Expo.
export function criarArmazenamentoSQLite(abrirBanco) {
  let banco;
  async function abrir() {
    if (!banco) {
      banco = (async () => {
        const conexao = await abrirBanco("alfatea-learning.db");
        await conexao.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS learning_accounts (
            account_id TEXT PRIMARY KEY NOT NULL,
            payload TEXT NOT NULL
          );
        `);
        return conexao;
      })().catch((erro) => { banco = null; throw erro; });
    }
    return banco;
  }
  return {
    async ler(contaId) {
      const db = await abrir();
      const linha = await db.getFirstAsync("SELECT payload FROM learning_accounts WHERE account_id = ?", contaId);
      return linha?.payload || null;
    },
    async salvar(contaId, payload) {
      const db = await abrir();
      await db.runAsync("INSERT INTO learning_accounts (account_id, payload) VALUES (?, ?) ON CONFLICT(account_id) DO UPDATE SET payload = excluded.payload", contaId, payload);
    },
  };
}
