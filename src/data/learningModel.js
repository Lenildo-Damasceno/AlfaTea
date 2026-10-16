// Estado local separado por conta; visitas e respostas têm significados distintos.
export const AVATARES = { estrela: "⭐", gato: "🐱", borboleta: "🦋", sol: "☀️" };

export function novoProgresso() {
  return { letras: [], silabas: [], respostas: {}, ultima: null };
}

export function novaConta() {
  return {
    versao: 1,
    perfilAtivo: "principal",
    perfis: [{ id: "principal", apelido: "", avatar: "estrela" }],
    progresso: { principal: novoProgresso() },
  };
}

export function atualizarAprendizagem(estado, acao) {
  if (acao.tipo === "perfil") {
    const apelido = acao.apelido.trim().slice(0, 30);
    if (!apelido || !AVATARES[acao.avatar]) throw new Error("Escolha um apelido e um avatar.");
    const existente = estado.perfis.some((perfil) => perfil.id === acao.perfilId);
    const perfil = { id: acao.perfilId, apelido, avatar: acao.avatar };
    return {
      ...estado,
      perfilAtivo: perfil.id,
      perfis: existente ? estado.perfis.map((item) => item.id === perfil.id ? perfil : item) : [...estado.perfis, perfil],
      progresso: { ...estado.progresso, [perfil.id]: estado.progresso[perfil.id] || novoProgresso() },
    };
  }
  if (!estado.perfis.some((perfil) => perfil.id === acao.perfilId)) throw new Error("Perfil não encontrado.");
  if (acao.tipo === "selecionar") return { ...estado, perfilAtivo: acao.perfilId };
  const atual = estado.progresso[acao.perfilId] || novoProgresso();
  let proximo;
  if (acao.tipo === "visita") {
    if (!["letras", "silabas"].includes(acao.modulo) || !/^[A-Z]$/.test(acao.letra)) throw new Error("Conteúdo inválido.");
    proximo = {
      ...atual,
      [acao.modulo]: [...new Set([...atual[acao.modulo], acao.letra])],
      ultima: { modulo: acao.modulo, letra: acao.letra },
    };
  } else if (acao.tipo === "resposta") {
    if (!/^[A-Z]$/.test(acao.letra) || typeof acao.acertou !== "boolean") throw new Error("Resposta inválida.");
    const anterior = atual.respostas[acao.letra] || { tentativas: 0, acertos: 0 };
    proximo = {
      ...atual,
      respostas: { ...atual.respostas, [acao.letra]: {
        tentativas: anterior.tentativas + 1,
        acertos: anterior.acertos + Number(acao.acertou),
        data: acao.data,
      } },
      ultima: { modulo: "atividade", letra: acao.letra },
    };
  } else {
    throw new Error("Ação desconhecida.");
  }
  return { ...estado, progresso: { ...estado.progresso, [acao.perfilId]: proximo } };
}

export function caminhoContinuar(ultima) {
  if (!ultima || !/^[A-Z]$/.test(ultima.letra)) return "/learn";
  if (ultima.modulo === "letras") return `/letters/${ultima.letra}`;
  if (ultima.modulo === "silabas") return `/syllables/${ultima.letra}`;
  if (ultima.modulo === "atividade") return `/activity?letter=${ultima.letra}`;
  return "/learn";
}
