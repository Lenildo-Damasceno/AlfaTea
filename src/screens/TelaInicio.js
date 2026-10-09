import { router } from "expo-router";
import { Image } from "react-native";
import TelaBase from "../components/Screen";
import MensagemAlfi from "../components/AlfiMessage";
import BotaoPrincipal from "../components/PrimaryButton";

// Mostra as boas-vindas e o acesso aos modulos.
export default function TelaInicio() {
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
      <MensagemAlfi>Olá! Vamos aprender?</MensagemAlfi>
      <BotaoPrincipal
        title="COMEÇAR"
        onPress={() => router.navigate("/learn")}
      />
    </TelaBase>
  );
}
