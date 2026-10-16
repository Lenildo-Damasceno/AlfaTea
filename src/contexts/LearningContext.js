import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { criarRepositorio } from "../services/learningRepository";
import { armazenamentoAprendizagem } from "../services/learningStorage";
import { novaConta, novoProgresso } from "../data/learningModel";
import { useAuth } from "./AuthContext";

const ContextoAprendizagem = createContext(null);
const repositorio = criarRepositorio(armazenamentoAprendizagem);

export function ProvedorAprendizagem({ children }) {
  const { usuario } = useAuth();
  // A chave desmonta o estado anterior imediatamente ao trocar de conta.
  return <EstadoAprendizagem key={usuario?.id || "visitante"} contaId={usuario?.id}>{children}</EstadoAprendizagem>;
}

function EstadoAprendizagem({ contaId, children }) {
  const [estado, definirEstado] = useState(novaConta);
  const [carregado, definirCarregado] = useState(false);
  const [erro, definirErro] = useState("");
  const [recarga, definirRecarga] = useState(0);
  useEffect(() => {
    let ativo = true;
    if (!contaId) return;
    repositorio.carregar(contaId).then((salvo) => {
      if (ativo) { definirEstado(salvo); definirErro(""); definirCarregado(true); }
    }).catch(() => {
      if (ativo) definirErro("Não foi possível abrir os dados salvos. Tente novamente.");
    });
    return () => { ativo = false; };
  }, [contaId, recarga]);

  const atualizar = useCallback(async (acao) => {
    if (!contaId || !carregado) throw new Error("Aguarde o carregamento do perfil.");
    try {
      const salvo = await repositorio.atualizar(contaId, acao);
      definirEstado(salvo);
      definirErro("");
    } catch (falha) {
      definirErro("Não foi possível salvar. Tente novamente antes de sair desta tela.");
      throw falha;
    }
  }, [contaId, carregado]);
  const perfilId = estado.perfilAtivo;
  const registrarVisita = useCallback((modulo, letra) =>
    atualizar({ tipo: "visita", perfilId, modulo, letra }), [atualizar, perfilId]);
  const registrarResposta = useCallback((letra, acertou) =>
    atualizar({ tipo: "resposta", perfilId, letra, acertou, data: new Date().toISOString() }), [atualizar, perfilId]);

  return <ContextoAprendizagem.Provider value={{
    carregado, erro, perfis: estado.perfis,
    perfil: estado.perfis.find((item) => item.id === perfilId),
    progresso: estado.progresso[perfilId] || novoProgresso(),
    registrarVisita, registrarResposta,
    salvarPerfil: (perfil) => atualizar({ tipo: "perfil", ...perfil }),
    selecionarPerfil: (id) => atualizar({ tipo: "selecionar", perfilId: id }),
    tentarNovamente: () => { definirCarregado(false); definirRecarga((valor) => valor + 1); },
  }}>{children}</ContextoAprendizagem.Provider>;
}

export function useAprendizagem() { return useContext(ContextoAprendizagem); }
