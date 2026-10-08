import { router } from "expo-router";
import { Text } from "react-native";
import TelaBase from "../components/Screen";
import MensagemAlfi from "../components/AlfiMessage";
import BotaoPrincipal from "../components/PrimaryButton";
import { CORES } from "../constants/theme";

// Mostra as boas-vindas e o acesso aos modulos.
export default function TelaInicio() {
  return (
    <TelaBase title="">
      <Text
        style={{
          color: CORES.texto,
          fontSize: 18,
        }}
      >
        Aprender no seu ritmo.
      </Text>
      <MensagemAlfi>Olá! Vamos aprender?</MensagemAlfi>
      <BotaoPrincipal
        title="COMEÇAR"
        onPress={() => router.navigate("/learn")}
      />
    </TelaBase>
  );
}
