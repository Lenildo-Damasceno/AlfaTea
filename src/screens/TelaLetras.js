import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import TelaBase from "../components/Screen";
import CartaoLetra from "../components/LetterCard";
import { ALFABETO } from "../data/alphabet";
import { CORES } from "../constants/theme";


// Exibe as 26 letras e abre a letra escolhida.
export default function TelaLetras() {
  return (
    <TelaBase title="Letras de A a Z">
      <View style={estilos.boasVindas}>
        <Image
          source={require("../../assets/images/alfi/alfi_ola.png")}
          style={estilos.alfi}
          resizeMode="contain"
          accessible={false}
        />
        <Text style={estilos.instrucao}>
          Vamos conhecer as letras? Toque em uma para começar.
        </Text>
      </View>
      <View style={estilos.grade}>
        {ALFABETO.map((item) => (
          <CartaoLetra
            key={item.letra}
            item={item}
            onPress={() =>
              router.push({
                pathname: "/letters/[letter]",
                params: {
                  letter: item.letra,
                },
              })
            }
          />
        ))}
      </View>
    </TelaBase>
  );
}




const estilos = StyleSheet.create({
  boasVindas: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  alfi: {
    width: 80,
    height: 100,
  },
  instrucao: {
    flex: 1,
    fontSize: 19,
    lineHeight: 28,
    color: CORES.texto,
  },
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  legenda: {
    fontSize: 16,
    color: CORES.texto,
    textAlign: "center",
  },
});
