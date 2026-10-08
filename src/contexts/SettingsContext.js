import { createContext, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import {
  lembreteEstaAtivo,
  configurarLembrete,
} from "../services/notifications";
const ContextoConfiguracoes = createContext(null);
const CHAVE_CONFIGURACOES = "@alfatea/settings/v1";

// A chave e o campo "vibration" preservam as preferências já salvas no celular.

// Compartilha as preferencias e as acoes de configuracao entre as telas.
export function ProvedorConfiguracoes({ children: conteudo }) {
  const [configuracoes, definirConfiguracoes] = useState({
    vibration: false,
    som: true,
  });
  const [carregado, definirCarregado] = useState(false);
  const [erro, definirErro] = useState("");
  const [notificacoes, definirNotificacoes] = useState(false);
  const [ocupado, definirOcupado] = useState(false);
  const bloqueio = useRef(false);

  // Recupera as preferências ao abrir e evita atualizar um componente desmontado.
  useEffect(() => {
    let ativo = true;
    AsyncStorage.getItem(CHAVE_CONFIGURACOES)
      .then((dadosSalvos) => {
        const preferenciasSalvas = dadosSalvos ? JSON.parse(dadosSalvos) : {};
        if (ativo)
          definirConfiguracoes({
            vibration: preferenciasSalvas.vibration === true,
            som: preferenciasSalvas.som !== false,
          });
      })
      .catch(() => {
        if (ativo) definirErro("Não foi possível recuperar suas preferências.");
      })
      .finally(() => {
        if (ativo) definirCarregado(true);
      });
    return () => {
      ativo = false;
    };
  }, []);

  // Salva a preferencia de vibracao e atualiza a interface.
  async function atualizarVibracao(valor) {
    if (bloqueio.current || !carregado) return;
    bloqueio.current = true;
    definirOcupado(true);
    try {
      const proximasConfiguracoes = {
        ...configuracoes,
        vibration: valor,
      };
      await AsyncStorage.setItem(
        CHAVE_CONFIGURACOES,
        JSON.stringify(proximasConfiguracoes),
      );
      definirConfiguracoes(proximasConfiguracoes);
      definirErro("");
    } finally {
      bloqueio.current = false;
      definirOcupado(false);
    }
  }

  // Guarda a preferência de som sem alterar a preferência de vibração.
  async function atualizarSom(valor) {
    if (bloqueio.current || !carregado) return;
    bloqueio.current = true;
    definirOcupado(true);
    try {
      const proximasConfiguracoes = { ...configuracoes, som: valor };
      await AsyncStorage.setItem(CHAVE_CONFIGURACOES, JSON.stringify(proximasConfiguracoes));
      definirConfiguracoes(proximasConfiguracoes);
      definirErro("");
    } finally {
      bloqueio.current = false;
      definirOcupado(false);
    }
  }

  // Ativa ou cancela o lembrete sem executar pedidos simultaneos.
  async function atualizarLembrete(valor) {
    if (bloqueio.current) return;
    bloqueio.current = true;
    definirOcupado(true);
    try {
      await configurarLembrete(valor);
      definirNotificacoes(valor);
    } finally {
      bloqueio.current = false;
      definirOcupado(false);
    }
  }

  // Consulta o sistema e atualiza o estado do lembrete.
  async function consultarLembrete() {
    definirNotificacoes(await lembreteEstaAtivo());
  }

  // Emite vibracao suave quando a preferencia esta ativada.
  async function emitirFeedback(acertou = true) {
    if (!configuracoes.vibration) return;
    if (acertou) await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    else await Haptics.selectionAsync();
  }

  return (
    <ContextoConfiguracoes.Provider
      value={{
        configuracoes,
        carregado,
        erro,
        ocupado,
        notificacoes,
        atualizarVibracao,
        atualizarSom,
        atualizarLembrete,
        consultarLembrete,
        emitirFeedback,
      }}
    >
      {conteudo}
    </ContextoConfiguracoes.Provider>
  );
}

// Fornece acesso ao contexto de configuracoes.
export function useConfiguracoes() {
  return useContext(ContextoConfiguracoes);
}
