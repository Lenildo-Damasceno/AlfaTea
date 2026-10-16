import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import BotaoPrincipal from "./PrimaryButton";
import { CORES } from "../constants/theme";

const ALFI = require("../../assets/images/alfi/alfi_ola.png");

function BotaoSecundario({ titulo, onPress, disabled = false, vermelho = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [estilos.botaoSecundario, vermelho && estilos.botaoOuvir, pressed && estilos.pressionado]}
    >
      <Text style={[estilos.textoBotaoSecundario, vermelho && estilos.textoBotaoOuvir]}>{titulo}</Text>
    </Pressable>
  );
}

export default function AtividadeVogaisView({
  rodadas, indice, acertou, mensagem, salvando, erro, podeOuvir,
  onOuvir, onResponder, onAvancar, onReiniciar, onVerProgresso, onSair,
}) {
  const rodada = rodadas[indice];

  if (!rodada) {
    return (
      <View style={estilos.conteudo}>
        <View style={estilos.conclusao}>
          <Image source={ALFI} resizeMode="contain" accessible={false} style={estilos.alfiConclusao} />
          <Text accessibilityRole="header" style={estilos.tituloConclusao}>Você conseguiu!</Text>
          <Text style={estilos.descricaoConclusao}>Encontrou as cinco vogais com o Alfi.</Text>
          <View style={estilos.vogaisConcluidas} accessible accessibilityLabel="Vogais A, E, I, O e U concluídas">
            {rodadas.map(({ letra }) => (
              <View key={letra} style={estilos.vogalConcluida}>
                <Text accessible={false} style={estilos.textoVogalConcluida}>{letra}</Text>
              </View>
            ))}
          </View>
        </View>
        <BotaoPrincipal title="Ver meu progresso" onPress={onVerProgresso} />
        <BotaoSecundario titulo="Praticar novamente" onPress={onReiniciar} />
        <BotaoSecundario titulo="Voltar para aprender" onPress={onSair} />
      </View>
    );
  }

  return (
    <View style={estilos.conteudo}>
      <View
        style={estilos.progresso}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Progresso da atividade"
        accessibilityValue={{ min: 0, max: rodadas.length, now: indice + Number(acertou), text: `Vogal ${indice + 1} de ${rodadas.length}` }}
      >
        <View style={estilos.linhaProgresso}>
          <Text style={estilos.legendaProgresso}>UM PASSO DE CADA VEZ</Text>
          <Text style={estilos.contagem}>{indice + 1} de {rodadas.length}</Text>
        </View>
        <View style={estilos.trilha}>
          {rodadas.map(({ letra }, posicao) => (
            <View key={letra} style={[
              estilos.passo,
              posicao === indice && estilos.passoAtual,
              (posicao < indice || (posicao === indice && acertou)) && estilos.passoConcluido,
            ]} />
          ))}
        </View>
      </View>

      <View style={estilos.cartaoPedido} accessible accessibilityLabel={`O Alfi pede: encontre a vogal ${rodada.letra}.`}>
        <Image source={ALFI} resizeMode="contain" accessible={false} style={estilos.alfi} />
        <View style={estilos.pedido}>
          <Text accessible={false} style={estilos.instrucao}>Encontre a vogal</Text>
          <View style={estilos.alvo}>
            <Text accessible={false} style={estilos.letraAlvo}>{rodada.letra}</Text>
          </View>
        </View>
      </View>

      {podeOuvir ? (
        <BotaoSecundario titulo="Ouvir a vogal" onPress={onOuvir} vermelho />
      ) : (
        <Text style={estilos.dicaSom}>Observe a vogal no cartão para continuar.</Text>
      )}

      <View style={estilos.escolha}>
        <Text style={estilos.legendaEscolha}>Toque na letra igual à do cartão</Text>
        <View style={estilos.opcoes}>
          {rodada.opcoes.map((letra) => {
            const correta = acertou && letra === rodada.letra;
            return (
              <Pressable
                key={letra}
                accessibilityRole="button"
                accessibilityLabel={`Letra ${letra}${correta ? ", resposta correta" : ""}`}
                accessibilityState={{ disabled: acertou || salvando }}
                disabled={acertou || salvando}
                onPress={() => onResponder(letra)}
                style={({ pressed }) => [estilos.opcao, correta && estilos.opcaoCorreta, pressed && estilos.pressionado]}
              >
                <Text style={[estilos.letra, correta && estilos.letraCorreta]}>{letra}</Text>
                {correta ? <Text accessible={false} style={estilos.seloCorreto}>✓</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[estilos.feedback, acertou && estilos.feedbackCorreto]}>
        {salvando ? (
          <>
            <ActivityIndicator color={CORES.primaria} />
            <Text accessibilityLiveRegion="polite" style={estilos.textoFeedback}>Guardando sua resposta...</Text>
          </>
        ) : (
          <>
            <Text accessible={false} style={[estilos.iconeFeedback, acertou && estilos.letraCorreta]}>{acertou ? "✓" : mensagem ? "↻" : "♡"}</Text>
            <Text accessibilityLiveRegion="polite" style={estilos.textoFeedback}>{mensagem || "Pode tentar com calma. O Alfi está com você!"}</Text>
          </>
        )}
      </View>

      {erro ? <Text accessibilityRole="alert" style={estilos.erro}>{erro}</Text> : null}

      <View style={estilos.acoes}>
        {acertou ? (
          <BotaoPrincipal title={indice === rodadas.length - 1 ? "Concluir atividade" : "Próxima vogal"} onPress={onAvancar} />
        ) : null}
        <BotaoSecundario titulo="Voltar para aprender" disabled={salvando} onPress={onSair} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteudo: { gap: 18 },
  progresso: { gap: 10 },
  linhaProgresso: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8 },
  legendaProgresso: { fontSize: 11, letterSpacing: 0.8, fontWeight: "700", color: "#52657B" },
  contagem: { fontSize: 14, fontWeight: "700", color: CORES.primaria },
  trilha: { flexDirection: "row", gap: 6 },
  passo: { flex: 1, height: 7, borderRadius: 4, backgroundColor: "#DFE8F2" },
  passoAtual: { backgroundColor: CORES.primaria },
  passoConcluido: { backgroundColor: CORES.secundaria },
  cartaoPedido: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", padding: 20, gap: 16, borderRadius: 28, backgroundColor: "#EAF3FF", borderWidth: 1, borderColor: "#D7E8FA" },
  alfi: { width: 88, height: 116 },
  pedido: { flex: 1, minWidth: 116, alignItems: "center", gap: 10 },
  instrucao: { color: CORES.texto, fontSize: 18, fontWeight: "700", textAlign: "center" },
  alvo: { backgroundColor: CORES.branco, borderRadius: 20, paddingHorizontal: 24, paddingVertical: 4, minWidth: 88, alignItems: "center" },
  letraAlvo: { fontSize: 64, fontWeight: "900", color: CORES.primaria, textAlign: "center" },
  botaoSecundario: { minHeight: 48, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 16, borderWidth: 1, borderColor: "#D4E2F1", backgroundColor: CORES.branco, alignItems: "center", justifyContent: "center" },
  textoBotaoSecundario: { fontSize: 16, fontWeight: "700", color: CORES.primaria, textAlign: "center" },
  botaoOuvir: { backgroundColor: CORES.erro, borderColor: CORES.erro },
  textoBotaoOuvir: { color: CORES.branco },
  dicaSom: { fontSize: 14, lineHeight: 21, color: "#52657B", textAlign: "center" },
  escolha: { gap: 12 },
  legendaEscolha: { fontSize: 16, lineHeight: 23, color: CORES.texto, textAlign: "center" },
  opcoes: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  opcao: { flexGrow: 1, flexBasis: "27%", minWidth: 68, minHeight: 104, paddingHorizontal: 10, paddingVertical: 18, borderWidth: 2, borderBottomWidth: 5, borderColor: "#C5D9EF", borderRadius: 22, backgroundColor: CORES.branco, alignItems: "center", justifyContent: "center" },
  pressionado: { opacity: 0.7 },
  opcaoCorreta: { borderColor: CORES.secundaria, backgroundColor: "#EAF5EE" },
  letra: { fontSize: 46, fontWeight: "800", color: CORES.primaria, textAlign: "center" },
  letraCorreta: { color: CORES.secundaria },
  seloCorreto: { position: "absolute", top: 5, right: 8, fontSize: 16, fontWeight: "800", color: CORES.secundaria },
  feedback: { minHeight: 80, flexDirection: "row", alignItems: "center", padding: 16, gap: 12, borderRadius: 20, backgroundColor: "#EDF1F6" },
  feedbackCorreto: { backgroundColor: "#EAF5EE" },
  iconeFeedback: { fontSize: 26, color: CORES.primaria },
  textoFeedback: { flex: 1, fontSize: 16, lineHeight: 24, color: CORES.texto },
  erro: { fontSize: 15, lineHeight: 22, color: CORES.erro },
  acoes: { gap: 12 },
  conclusao: { alignItems: "center", gap: 18, borderRadius: 28, paddingHorizontal: 16, paddingVertical: 24, backgroundColor: "#EAF5EE" },
  alfiConclusao: { width: 130, height: 154 },
  tituloConclusao: { fontSize: 30, fontWeight: "800", color: CORES.secundaria, textAlign: "center" },
  descricaoConclusao: { fontSize: 18, lineHeight: 27, color: CORES.texto, textAlign: "center" },
  vogaisConcluidas: { alignSelf: "stretch", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  vogalConcluida: { minWidth: 36, minHeight: 44, padding: 8, borderRadius: 12, backgroundColor: CORES.branco, alignItems: "center", justifyContent: "center" },
  textoVogalConcluida: { fontSize: 22, fontWeight: "800", color: CORES.secundaria },
});
