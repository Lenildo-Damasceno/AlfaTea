import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import { PALAVRAS_SILABAS } from "../data/silabas";
import { CORES, CORES_LETRAS } from "../constants/theme";
import { useConfiguracoes } from "../contexts/SettingsContext";
import { useVoz } from "../hooks/useVoz";

export default function TelaSilaba() {
  const { letter: letra } = useLocalSearchParams();
  const { configuracoes, carregado, emitirFeedback } = useConfiguracoes();
  const podeOuvir = carregado && configuracoes.som;
  const { falar, mensagemVoz } = useVoz(podeOuvir, letra);
  const item = PALAVRAS_SILABAS.find((entrada) => entrada.letra === letra);

  if (!item) {
    return (
      <TelaBase title="Vamos escolher uma palavra?">
        <BotaoPrincipal title="Ver palavras" onPress={() => router.replace("/syllables")} />
      </TelaBase>
    );
  }

  function tocarSilaba(silaba) {
    if (!carregado) return;
    emitirFeedback().catch(() => {});
    if (podeOuvir) falar(silaba.toLowerCase());
  }

  function irParaPalavra(indice) {
    router.replace({ pathname: "/syllables/[letter]", params: { letter: PALAVRAS_SILABAS[indice].letra } });
  }

  return (
    <TelaBase title="Uma palavra, várias partes">
      <Text style={estilos.instrucao}>{podeOuvir ? "Toque em cada sílaba para ouvir." : "Observe as partes que formam a palavra."}</Text>
      <View style={estilos.cartao}>
        <Text style={estilos.emoji} accessible={false}>{item.emoji}</Text>
        <Text style={estilos.palavra}>{item.palavra}</Text>
        <View style={estilos.silabas}>
          {item.silabas.map((silaba, indice) => (
            <Pressable
              key={`${indice}-${silaba}`}
              accessibilityRole="button"
              accessibilityLabel={`Sílaba ${indice + 1}: ${silaba}`}
              accessibilityHint={podeOuvir ? "Ouvir esta sílaba" : "Ative o som nas Configurações para ouvir"}
              accessibilityState={{ disabled: !carregado }}
              disabled={!carregado}
              onPress={() => tocarSilaba(silaba)}
              style={({ pressed }) => [estilos.silaba, { borderColor: CORES_LETRAS[indice % CORES_LETRAS.length] }, pressed && estilos.pressionado]}
            >
              <Text style={[estilos.textoSilaba, { color: CORES_LETRAS[indice % CORES_LETRAS.length] }]}>{silaba}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={estilos.observacao}>{item.silabas.join(" • ")} — {item.silabas.length} sílabas</Text>
        {item.letra === "W" ? <Text style={estilos.observacao}>Aqui usamos a leitura em português de William. A pronúncia de nomes pode variar.</Text> : null}
      </View>
      {podeOuvir ? (
        <BotaoPrincipal title="Ouvir a palavra inteira" onPress={() => falar(item.palavra.toLowerCase())} />
      ) : (
        <Text style={estilos.observacao}>{carregado ? "O som está desligado. Ative nas Configurações para ouvir." : "Carregando preferência de som..."}</Text>
      )}
      {mensagemVoz ? <Text accessibilityRole="alert">{mensagemVoz}</Text> : null}
      <Text style={estilos.observacao}>Palavra {item.indice + 1} de {PALAVRAS_SILABAS.length}</Text>
      {item.indice < PALAVRAS_SILABAS.length - 1 ? <BotaoPrincipal title="Próxima palavra →" onPress={() => irParaPalavra(item.indice + 1)} /> : null}
      {item.indice > 0 ? <BotaoPrincipal title="← Palavra anterior" onPress={() => irParaPalavra(item.indice - 1)} /> : null}
      <BotaoPrincipal title="Ver todas as palavras" onPress={() => router.dismissTo("/syllables")} />
    </TelaBase>
  );
}

const estilos = StyleSheet.create({
  instrucao: { fontSize: 19, lineHeight: 28, color: CORES.texto },
  cartao: { backgroundColor: CORES.branco, borderRadius: 24, padding: 20, alignItems: "center", gap: 20 },
  emoji: { fontSize: 64 },
  palavra: { fontSize: 28, fontWeight: "800", color: CORES.texto, textAlign: "center", maxWidth: "100%" },
  silabas: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 12 },
  silaba: { minWidth: 64, minHeight: 64, maxWidth: "100%", padding: 12, borderWidth: 2, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  textoSilaba: { fontSize: 30, fontWeight: "800" },
  observacao: { fontSize: 16, lineHeight: 24, color: CORES.texto, textAlign: "center" },
  pressionado: { opacity: 0.65 },
});
