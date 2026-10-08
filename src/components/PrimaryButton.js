import { Pressable, Text, StyleSheet } from "react-native";
import { CORES } from "../constants/theme";

// Exibe um botao acessivel e executa a acao recebida.
export default function BotaoPrincipal({
  title: titulo,
  onPress: aoPressionar,
  corFundo = CORES.primaria,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={aoPressionar}
      style={({ pressed: pressionado }) => [
        estilos.botao,
        { backgroundColor: corFundo },
        pressionado && {
          opacity: 0.8,
        },
      ]}
    >
      <Text style={estilos.texto}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: CORES.primaria,
    borderRadius: 16,
    padding: 18,
    minHeight: 56,
    alignItems: "center",
  },
  texto: {
    color: CORES.branco,
    fontSize: 18,
    fontWeight: "700",
  },
});
