import { Alert, Linking, Text } from "react-native";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import { CORES } from "../constants/theme";

// Apresenta o objetivo do aplicativo e um link educacional.
export default function TelaSobre() {
  // Abre o site educacional e informa quando não é possível acessá-lo.
  async function abrirSiteEducacional() {
    try {
      await Linking.openURL("https://www.gov.br/mec/pt-br");
    } catch {
      Alert.alert("Não foi possível abrir o link", "Tente novamente mais tarde.");
    }
  }

  return (
    <TelaBase title="Sobre o Alfatea">
      <Text
        style={{
          color: CORES.texto,
          fontSize: 18,
        }}
      >
        Aprender no seu ritmo. Uma ferramenta de apoio pedagógico à
        alfabetização, com atividades simples e acolhedoras.
      </Text>
      <BotaoPrincipal
        title="Conhecer o Ministério da Educação"
        onPress={abrirSiteEducacional}
      />
    </TelaBase>
  );
}
