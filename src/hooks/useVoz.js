import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";
import { AppState } from "react-native";
import * as Voz from "expo-speech";

// Controla a fala da tela e descarta pedidos antigos após toques rápidos.
export function useVoz(somAtivado, letra) {
  const [mensagemVoz, definirMensagemVoz] = useState("");
  const pedidoAtual = useRef(0);
  const telaAtiva = useRef(false);

  // Cancela a fala e invalida qualquer reprodução que ainda esteja aguardando.
  const pararVoz = useCallback(() => {
    pedidoAtual.current += 1;
    return Voz.stop();
  }, []);

  // Para ao trocar de letra, sair da tela, desligar o som ou minimizar o app.
  useFocusEffect(useCallback(() => {
    telaAtiva.current = somAtivado && typeof letra === "string";
    definirMensagemVoz("");
    const inscricao = AppState.addEventListener("change", (estado) => {
      if (estado !== "active") pararVoz().catch(() => {});
    });

    return () => {
      telaAtiva.current = false;
      inscricao.remove();
      pararVoz().catch(() => {});
    };
  }, [letra, somAtivado, pararVoz]));

  // Lê o texto em português e substitui a fala anterior, sem formar uma fila.
  async function falar(texto) {
    if (!somAtivado || !telaAtiva.current || AppState.currentState === "background") return;
    const pedido = ++pedidoAtual.current;
    definirMensagemVoz("");
    try {
      await Voz.stop();
      if (pedido !== pedidoAtual.current || !telaAtiva.current) return;
      Voz.speak(texto, {
        language: "pt-BR",
        rate: 0.85,
        onError: () => {
          if (pedido === pedidoAtual.current && telaAtiva.current) {
            definirMensagemVoz("Não foi possível reproduzir a voz. Verifique a voz em português nas configurações do celular.");
          }
        },
      });
    } catch {
      if (pedido === pedidoAtual.current && telaAtiva.current) {
        definirMensagemVoz("Não foi possível iniciar a fala. Tente novamente.");
      }
    }
  }

  return { falar, pararVoz, mensagemVoz };
}
