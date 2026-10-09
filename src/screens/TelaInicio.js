import { router } from "expo-router";
import { Image } from "react-native";
import { useContext } from "react";
import TelaBase from "../components/Screen";
import MensagemAlfi from "../components/AlfiMessage";
import BotaoPrincipal from "../components/PrimaryButton";
import { AuthContext } from "../contexts/AuthContext";

// Mostra as boas-vindas e o acesso aos modulos.
export default function TelaInicio() {
  const { user } = useContext(AuthContext);
  const userName = user?.user_metadata?.nome || user?.email || "Usuário";

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
      <MensagemAlfi>Olá {userName}! Vamos aprender?</MensagemAlfi>
      <BotaoPrincipal
        title="COMEÇAR"
        onPress={() => router.navigate("/learn")}
      />
    </TelaBase>
  );
}
