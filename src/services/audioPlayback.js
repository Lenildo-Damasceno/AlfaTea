import * as Voz from "expo-speech";
import { createAudioPlayer, setAudioModeAsync } from "expo-audio";
import catalogo from "../../assets/audio/catalog.json";
import { FONTES_AUDIO } from "../data/audioSources";

const normalizar = (texto) => texto.trim().toLocaleLowerCase("pt-BR");
const revisados = new Map(catalogo.gravacoes.filter((item) => item.revisado).map((item) => [normalizar(item.texto), FONTES_AUDIO[item.id]]));
let player;
let inscricao;
let pedidoAtual = 0;

export async function pararAudio() {
  pedidoAtual += 1;
  inscricao?.remove();
  inscricao = null;
  player?.pause();
  await Voz.stop();
}

// Um único controlador atende todas as telas, sem sobrepor fala e gravação local.
export async function reproduzirVoz(texto, aoFalhar) {
  const pedido = ++pedidoAtual;
  inscricao?.remove();
  inscricao = null;
  player?.pause();
  await Voz.stop();
  if (pedido !== pedidoAtual) return;
  const fonte = revisados.get(normalizar(texto));
  if (!fonte) {
    Voz.speak(texto, { language: "pt-BR", rate: 0.85,
      onError: () => { if (pedido === pedidoAtual) aoFalhar(); },
    });
    return;
  }
  await setAudioModeAsync({ playsInSilentMode: false, shouldPlayInBackground: false, interruptionMode: "doNotMix" });
  if (pedido !== pedidoAtual) return;
  if (!player) player = createAudioPlayer();
  player.replace(fonte);
  inscricao = player.addListener("playbackStatusUpdate", (status) => {
    if (status.error && pedido === pedidoAtual) aoFalhar();
  });
  player.play();
}
