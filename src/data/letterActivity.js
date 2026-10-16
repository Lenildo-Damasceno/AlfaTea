export const VOGAIS = ["A", "E", "I", "O", "U"];

function embaralhar(itens, aleatorio) {
  const lista = [...itens];
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  return lista;
}

export function criarAtividade(inicio, aleatorio = Math.random) {
  const indice = Math.max(0, VOGAIS.indexOf(inicio));
  return [...VOGAIS.slice(indice), ...VOGAIS.slice(0, indice)].map((letra) => ({
    letra,
    opcoes: embaralhar([letra, ...embaralhar(VOGAIS.filter((item) => item !== letra), aleatorio).slice(0, 2)], aleatorio),
  }));
}
