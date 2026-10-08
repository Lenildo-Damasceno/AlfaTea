import { router } from "expo-router";
import { Image, Text, StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BotaoPrincipal from "../components/PrimaryButton";
import { CORES } from "../constants/theme";

// Apresenta o Alfatea e abre a tela inicial.
export default function TelaAbertura() {
  return (
    <SafeAreaView style={estilos.tela}>
      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Image
          source={require("../../assets/images/branding/logo_alfatea.png")}
          style={estilos.logo}
          resizeMode="contain"
          accessibilityLabel="Alfatea"
        />
        <Text style={estilos.slogan}>Aprender no seu ritmo.</Text>
        <Image
          source={require("../../assets/images/alfi/alfi_ola.png")}
          style={estilos.alfi}
          resizeMode="contain"
          accessibilityLabel="Alfi, um dinossauro azul sorridente, acena para você"
        />
        <Text style={estilos.titulo}>Olá! Vamos aprender?</Text>
        <Text style={estilos.subtitulo}>
          Um passo de cada vez, junto com o Alfi.
        </Text>
        <View style={estilos.botao}>
          <BotaoPrincipal
            title="COMEÇAR"
            onPress={() => router.replace("/home")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  logo: {
    width: "100%",
    maxWidth: 330,
    height: 124,
  },
  slogan: {
    fontSize: 18,
    color: CORES.texto,
    textAlign: "center",
  },
  alfi: {
    width: "100%",
    maxWidth: 330,
    height: 300,
    marginVertical: 12,
  },
  titulo: {
    fontSize: 26,
    color: CORES.primaria,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 17,
    color: CORES.texto,
    textAlign: "center",
    lineHeight: 25,
  },
  botao: {
    width: "100%",
    maxWidth: 360,
    marginTop: 16,
  },
});
