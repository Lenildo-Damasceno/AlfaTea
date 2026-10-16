import { useRef, useState } from "react";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import TelaBase from "../components/Screen";
import AtividadeVogaisView from "../components/VowelActivityView";
import EstadoAprendizagem from "../components/LearningStatus";
import { useAuth } from "../contexts/AuthContext";
import { useAprendizagem } from "../contexts/LearningContext";
import { useConfiguracoes } from "../contexts/SettingsContext";
import { useVoz } from "../hooks/useVoz";
import { criarAtividade } from "../data/letterActivity";
import { NOMES_LETRAS } from "../data/nomesLetras";

export default function TelaAtividade() {
  const { letter } = useLocalSearchParams();
  const { usuario, carregandoAuth } = useAuth();
  const { perfil, carregado } = useAprendizagem();
  if (carregandoAuth) return null;
  if (!usuario) return <Redirect href="/login" />;
  return <TelaBase>
    <EstadoAprendizagem />
    {carregado ? <RodadaAtividade key={`${perfil.id}-${letter || "A"}`} inicio={letter} /> : null}
  </TelaBase>;
}

function RodadaAtividade({ inicio }) {
  const [rodadas, definirRodadas] = useState(() => criarAtividade(inicio));
  const [indice, definirIndice] = useState(0);
  const [acertou, definirAcertou] = useState(false);
  const [mensagem, definirMensagem] = useState("");
  const [salvando, definirSalvando] = useState(false);
  const [erro, definirErro] = useState("");
  const bloqueio = useRef(false);
  const { registrarResposta } = useAprendizagem();
  const { configuracoes, carregado, emitirFeedback } = useConfiguracoes();
  const rodada = rodadas[indice];
  const { falar, pararVoz, mensagemVoz } = useVoz(carregado && configuracoes.som, rodada?.letra || "fim");

  async function responder(letra) {
    if (bloqueio.current || acertou || !rodada) return;
    bloqueio.current = true;
    definirSalvando(true);
    definirErro("");
    const correta = letra === rodada.letra;
    try {
      await registrarResposta(rodada.letra, correta);
      definirAcertou(correta);
      definirMensagem(correta ? `Muito bem! Você encontrou a letra ${rodada.letra}.` : `Vamos tentar de novo? Procure a letra ${rodada.letra}.`);
      emitirFeedback(correta).catch(() => {});
    } catch {
      definirErro("Sua resposta não foi salva. Toque na opção novamente para tentar salvar.");
    } finally { bloqueio.current = false; definirSalvando(false); }
  }
  return <AtividadeVogaisView
    rodadas={rodadas}
    indice={indice}
    acertou={acertou}
    mensagem={mensagem}
    salvando={salvando}
    erro={erro || mensagemVoz}
    podeOuvir={carregado && configuracoes.som}
    onOuvir={() => { if (rodada) falar(NOMES_LETRAS[rodada.letra]); }}
    onResponder={responder}
    onVerProgresso={() => router.replace("/progress")}
    onReiniciar={() => {
      definirRodadas(criarAtividade("A")); definirIndice(0); definirAcertou(false); definirMensagem("");
    }}
    onAvancar={() => {
      pararVoz().catch(() => {}); definirIndice((valor) => valor + 1); definirAcertou(false); definirMensagem("");
    }}
    onSair={() => router.replace("/learn")}
  />;
}
