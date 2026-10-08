import { Pressable, StyleSheet, Text } from "react-native";
import { CORES, CORES_LETRAS } from "../constants/theme";

// Apresenta uma letra selecionavel com as cores do alfabeto.
export default function CartaoLetra({ item, onPress: aoPressionar }) {
  const cor = CORES_LETRAS[item.indice % CORES_LETRAS.length];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Letra ${item.letra}`}
      accessibilityHint="Abre a letra e uma palavra de exemplo"
      onPress={aoPressionar}
      style={({ pressed: pressionado }) => [
        estilos.cartao,
        {
          borderBottomColor: cor,
        },
        pressionado && estilos.pressionado,
      ]}
    >
      <Text
        style={[
          estilos.letra,
          {
            color: cor,
          },
        ]}
      >
        {item.letra}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexGrow: 1,
    flexBasis: "20%",
    minWidth: 64,
    minHeight: 88,
    padding: 8,
    backgroundColor: CORES.branco,
    borderRadius: 20,
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  letra: {
    fontSize: 44,
    fontWeight: "900",
  },
  pressionado: {
    opacity: 0.7,
    transform: [
      {
        scale: 0.97,
      },
    ],
  },
});
