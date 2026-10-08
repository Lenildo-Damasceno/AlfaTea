import { View, Text, Image, StyleSheet } from "react-native";
import { CORES } from "../constants/theme";

// Exibe o Alfi junto da mensagem de incentivo.
export default function MensagemAlfi({ children: conteudo }) {
  return (
    <View style={estilos.cartao}>
      <Image
        source={require("../../assets/images/alfi/alfi_ola.png")}
        style={estilos.alfi}
        resizeMode="contain"
        accessibilityLabel="Alfi acenando"
      />
      <Text style={estilos.mensagem}>{conteudo}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: CORES.branco,
    gap: 12,
    alignItems: "center",
  },
  alfi: {
    width: 200,
    height: 220,
  },
  mensagem: {
    fontSize: 24,
    fontWeight: "700",
    color: CORES.texto,
    textAlign: "center",
  },
});
