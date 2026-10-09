import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TelaBase from "../components/Screen";
import { PALAVRAS_SILABAS } from "../data/silabas";
import { CORES, CORES_LETRAS } from "../constants/theme";

export default function TelaSilabas() {
  return (
    <TelaBase title="Vamos conhecer as sílabas">
      <Text style={estilos.instrucao}>As palavras têm partes chamadas sílabas. Escolha uma palavra para explorar!</Text>
      <View style={estilos.lista}>
        {PALAVRAS_SILABAS.map((item) => (
          <Pressable
            key={item.letra}
            accessibilityRole="button"
            accessibilityLabel={`${item.palavra}, ${item.silabas.length} sílabas`}
            accessibilityHint="Abre a palavra separada em sílabas"
            onPress={() => router.push({ pathname: "/syllables/[letter]", params: { letter: item.letra } })}
            style={({ pressed }) => [estilos.cartao, { borderLeftColor: CORES_LETRAS[item.indice % CORES_LETRAS.length] }, pressed && estilos.pressionado]}
          >
            <Text style={estilos.emoji} accessible={false}>{item.emoji}</Text>
            <View style={estilos.conteudo}>
              <Text style={estilos.palavra}>{item.palavra}</Text>
              <Text style={estilos.quantidade}>{item.silabas.length} sílabas</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </TelaBase>
  );
}

const estilos = StyleSheet.create({
  instrucao: { fontSize: 19, lineHeight: 28, color: CORES.texto },
  lista: { gap: 12 },
  cartao: { flexDirection: "row", alignItems: "center", gap: 16, padding: 20, minHeight: 80, backgroundColor: CORES.branco, borderRadius: 20, borderLeftWidth: 5 },
  conteudo: { flex: 1, gap: 4 },
  emoji: { fontSize: 32 },
  palavra: { fontSize: 22, fontWeight: "800", color: CORES.texto },
  quantidade: { fontSize: 16, color: CORES.texto },
  pressionado: { opacity: 0.7 },
});
