import { ActivityIndicator, Pressable, Text, StyleSheet } from "react-native";
import { CORES } from "../constants/theme";

// Exibe um botao acessivel e executa a acao recebida.
export default function BotaoPrincipal({
  title: titulo,
  onPress: aoPressionar,
  corFundo = CORES.primaria,
  disabled = false,
  loading = false,
  accessibilityLabel,
}) {
  const indisponivel = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || titulo}
      accessibilityState={{ disabled: indisponivel, busy: loading }}
      disabled={indisponivel}
      onPress={aoPressionar}
      style={({ pressed: pressionado }) => [
        estilos.botao,
        { backgroundColor: corFundo },
        indisponivel && { opacity: 0.6 },
        pressionado && {
          opacity: 0.8,
        },
      ]}
    >
      {loading ? <ActivityIndicator color={CORES.branco} /> : null}
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
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  texto: {
    color: CORES.branco,
    fontSize: 18,
    fontWeight: "700",
    flexShrink: 1,
    textAlign: "center",
  },
});
