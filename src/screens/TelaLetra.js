import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import { ALFABETO } from "../data/alphabet";
import { CORES, CORES_LETRAS } from "../constants/theme";
import { useConfiguracoes } from "../contexts/SettingsContext";
import { useVoz } from "../hooks/useVoz";
import { NOMES_LETRAS } from "../data/nomesLetras";

// Apresenta a letra, uma palavra de exemplo e os controles de avancar e voltar.
export default function TelaLetra() {
  const { letter: letra } = useLocalSearchParams();
  const { configuracoes, carregado, emitirFeedback } = useConfiguracoes();
  const { falar, mensagemVoz } = useVoz(carregado && configuracoes.som, letra);
  const item = ALFABETO.find((entrada) => entrada.letra === letra);
  if (!item) {
    return (
      <TelaBase title="Vamos escolher uma letra?">
        <BotaoPrincipal
          title="Ver alfabeto"
          onPress={() => router.replace("/letters")}
        />
      </TelaBase>
    );
  }
  const cor = CORES_LETRAS[item.indice % CORES_LETRAS.length];
  const podeOuvir = carregado && configuracoes.som;

  // Respeita as preferências independentes de som e vibração ao tocar na letra.
  function tocarLetra() {
    if (!carregado) return;
    // A indisponibilidade da vibração não impede a reprodução da voz.
    emitirFeedback().catch(() => {});
    if (podeOuvir) falar(NOMES_LETRAS[item.letra]);
  }

  // Troca a letra sem acumular telas no historico.
  const irParaLetra = (indice) =>
    router.replace({
      pathname: "/letters/[letter]",
      params: {
        letter: ALFABETO[indice].letra,
      },
    });
  return (
    <TelaBase title={`Letra ${item.letra}`}>
      <Text style={estilos.instrucao}>
        {podeOuvir ? "Toque na letra para ouvir seu nome." : "Veja a letra e uma palavra que começa com ela."}
      </Text>
      <View
        style={[
          estilos.cartao,
          {
            borderColor: cor,
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Letra ${item.letra}, maiúscula e minúscula`}
          accessibilityHint={podeOuvir ? "Fala o nome desta letra" : "Ative o som nas Configurações para ouvir"}
          accessibilityState={{ disabled: !carregado }}
          disabled={!carregado}
          onPress={tocarLetra}
          style={({ pressed: pressionado }) => [estilos.areaLetra, pressionado && estilos.letraPressionada]}
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
          <Text
            style={[
              estilos.minuscula,
              {
                color: cor,
              },
            ]}
          >
            {item.letra.toLowerCase()}
          </Text>
        </Pressable>
        <View style={estilos.exemplo} accessible accessibilityLabel={item.palavra}>
          {item.emoji ? (
            <Text style={estilos.emoji} accessible={false}>{item.emoji}</Text>
          ) : null}
          <Text style={estilos.palavra}>{item.palavra}</Text>
        </View>
        {["W", "Y"].includes(item.letra) ? (
          <Text style={estilos.observacao}>
            Também encontramos esta letra em nomes de pessoas.
          </Text>
        ) : null}
      </View>
      <Text style={estilos.posicao}>Letra {item.indice + 1} de 26</Text>
      {carregado && configuracoes.som ? (
        <View style={{ gap: 12 }}>
          <BotaoPrincipal title="Ouvir exemplo" onPress={() => falar(`${NOMES_LETRAS[item.letra]} de ${item.palavra.toLowerCase()}`)} />
        </View>
      ) : (
        <Text style={estilos.observacao}>{carregado ? "O som está desligado. Ative nas Configurações para ouvir." : "Carregando preferência de som..."}</Text>
      )}
      {mensagemVoz ? <Text accessibilityRole="alert">{mensagemVoz}</Text> : null}
      {item.indice < 25 ? (
        <BotaoPrincipal
          title="Próxima letra →"
          corFundo={cor}
          onPress={() => irParaLetra(item.indice + 1)}
        />
      ) : (
        <BotaoPrincipal
          title="Voltar ao alfabeto"
          onPress={() => router.replace("/letters")}
        />
      )}
      {item.indice > 0 ? (
        <BotaoPrincipal
          title="← Letra anterior"
          onPress={() => irParaLetra(item.indice - 1)}
        />
      ) : null}
      {item.indice < 25 ? (
        <BotaoPrincipal
          title="Ver alfabeto"
          onPress={() => router.dismissTo("/letters")}
        />
      ) : null}
    </TelaBase>
  );
}

const estilos = StyleSheet.create({
  areaLetra: {
    alignItems: "center",
    minWidth: 120,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  letraPressionada: { opacity: 0.65 },
  instrucao: {
    fontSize: 19,
    lineHeight: 28,
    color: CORES.texto,
  },
  cartao: {
    backgroundColor: CORES.branco,
    borderRadius: 28,
    borderBottomWidth: 6,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  letra: {
    fontSize: 120,
    fontWeight: "900",
  },
  minuscula: {
    fontSize: 48,
    fontWeight: "700",
  },
  exemplo: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  emoji: {
    fontSize: 32,
  },
  palavra: {
    flexShrink: 1,
    maxWidth: "100%",
    fontSize: 26,
    fontWeight: "800",
    color: CORES.texto,
    textAlign: "center",
  },
  observacao: {
    fontSize: 16,
    lineHeight: 24,
    color: CORES.texto,
    textAlign: "center",
  },
  posicao: {
    fontSize: 16,
    color: CORES.texto,
    textAlign: "center",
  },
});
