import { router } from "expo-router";
import { Image } from "react-native";
import TelaBase from "../components/Screen";
import MensagemAlfi from "../components/AlfiMessage";
import BotaoPrincipal from "../components/PrimaryButton";
import { useAprendizagem } from "../contexts/LearningContext";
import EstadoAprendizagem from "../components/LearningStatus";

// Mostra as boas-vindas e o acesso aos modulos.
export default function TelaInicio() {
  const { perfil, progresso, carregado } = useAprendizagem();

  return (
    <TelaBase title="">
      <Image
        source={require("../../assets/images/branding/logo_alfatea.png")}
        resizeMode="contain"
        accessibilityLabel="Alfatea"
        style={{
          width: "100%",
          maxWidth: 330,
          height: 124,
          alignSelf: "center",
        }}
      />
      <MensagemAlfi>{carregado && perfil.apelido ? `Olá, ${perfil.apelido}! Vamos aprender?` : "Olá! Vamos aprender?"}</MensagemAlfi>
      <EstadoAprendizagem />
      <BotaoPrincipal
        title={!carregado ? "Carregando..." : progresso.ultima ? "Continuar" : "Começar"}
        loading={!carregado}
        onPress={() => router.navigate("/learn")}
      />
    </TelaBase>
  );
}
