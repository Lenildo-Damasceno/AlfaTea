import { useCallback, useRef, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { AppState, Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BotaoPrincipal from "../components/PrimaryButton";
import { useConfiguracoes } from "../contexts/SettingsContext";
import { useAuth } from "../contexts/AuthContext";
import { CORES } from "../constants/theme";

// VideoPlayer é um controlador nativo mutável, não um estado React.
function definirMudo(player, mudo) {
  player.muted = mudo;
}

// Vídeo local: funciona sem internet e substitui a antiga apresentação.
export default function TelaAbertura() {
  const { configuracoes, carregado, reduzirMovimento } = useConfiguracoes();
  const [pulou, definirPulou] = useState(false);
  if (!carregado || configuracoes.pularAbertura || reduzirMovimento || pulou) {
    return <SafeAreaView style={estilos.tela}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
      <Image source={require("../../assets/images/alfi/alfi_ola.png")} resizeMode="contain"
        accessibilityLabel="Alfi dá as boas-vindas" style={{ width: "100%", height: 300 }} />
      <View style={estilos.acoes}>
        <Text style={estilos.texto}>Alfatea — Aprender no seu ritmo.</Text>
        <AcoesDaConta />
      </View>
      </ScrollView>
    </SafeAreaView>;
  }
  return <AberturaComVideo aoPular={() => definirPulou(true)} />;
}

function AcoesDaConta() {
  const { usuario, carregandoAuth } = useAuth();
  return <>
    <BotaoPrincipal title={carregandoAuth ? "Carregando conta..." : usuario ? "Continuar" : "Login"}
      loading={carregandoAuth} onPress={() => usuario ? router.replace("/home") : router.push("/login")} />
    {!carregandoAuth && !usuario ? <BotaoPrincipal title="Se cadastrar" corFundo={CORES.secundaria}
      onPress={() => router.push("/login?modo=signup")} /> : null}
  </>;
}

function AberturaComVideo({ aoPular }) {
  const { configuracoes, carregado } = useConfiguracoes();
  const saiu = useRef(false);
  const [somWeb, definirSomWeb] = useState(false);
  const [videoFinalizado, definirVideoFinalizado] = useState(false);
  const player = useVideoPlayer(require("../../assets/videos/abertura.mp4"), (video) => {
    video.loop = false;
    video.muted = Platform.OS === "web";
  });

  const concluirVideo = useCallback(() => {
    if (saiu.current || videoFinalizado) return;
    definirVideoFinalizado(true);
    player.pause();
  }, [player, videoFinalizado]);

  useFocusEffect(useCallback(() => {
    saiu.current = false;
    definirVideoFinalizado(false);
    definirMudo(player, !carregado || !configuracoes.som || (Platform.OS === "web" && !somWeb));
    const fim = player.addListener("playToEnd", concluirVideo);
    const erro = player.addListener("statusChange", ({ status }) => {
      if (status === "error") concluirVideo();
    });
    const estado = AppState.addEventListener("change", (valor) => {
      if (saiu.current) return;
      if (valor === "active" && !videoFinalizado) player.play();
      else player.pause();
    });
    if (player.status === "error") concluirVideo();
    else if (AppState.currentState !== "background" && !videoFinalizado) player.play();
    return () => {
      saiu.current = true;
      fim.remove();
      erro.remove();
      estado.remove();
      // useVideoPlayer libera o player ao desmontar. Não chamar métodos
      // nativos aqui: essa liberação pode ocorrer antes deste cleanup.
    };
  }, [player, concluirVideo, carregado, configuracoes.som, somWeb, videoFinalizado]));

  return (
    <View style={estilos.tela}>
      <View style={estilos.areaVideo}>
        <VideoView
          player={player}
          style={estilos.video}
          contentFit="cover"
          nativeControls={false}
          fullscreenOptions={{ enable: false }}
          allowsPictureInPicture={false}
          playsInline
          accessibilityLabel="Vídeo de boas-vindas do Alfatea"
        />
      </View>
      <SafeAreaView style={estilos.sobreposicao} pointerEvents="box-none">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}>
      <View style={estilos.acoes}>
        <Text style={estilos.texto}>Alfatea — Aprender no seu ritmo.</Text>
        {Platform.OS === "web" && carregado && configuracoes.som && !somWeb ? (
          <BotaoPrincipal title="Ativar som" onPress={() => {
            definirMudo(player, false);
            player.play();
            definirSomWeb(true);
          }} />
        ) : null}
        <AcoesDaConta />
        <BotaoPrincipal title="Pular apresentação" onPress={aoPular} />
      </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: CORES.fundo },
  areaVideo: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
  video: { width: "100%", height: "100%" },
  sobreposicao: { flex: 1, justifyContent: "flex-end" },
  acoes: { padding: 24, gap: 16, width: "100%", maxWidth: 640, alignSelf: "center", backgroundColor: "rgba(0, 0, 0, 0.45)" },
  texto: { fontSize: 18, color: CORES.branco, textAlign: "center" },
});
