import { Text } from "react-native";
import { router } from "expo-router";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import EstadoAprendizagem from "../components/LearningStatus";
import { useAprendizagem } from "../contexts/LearningContext";
import { AVATARES, caminhoContinuar } from "../data/learningModel";

export default function TelaProgresso() {
  const { perfil, progresso, carregado } = useAprendizagem();
  const respostas = Object.values(progresso.respostas);
  const reconhecidas = Object.entries(progresso.respostas).filter(([, valor]) => valor.acertos > 0).map(([letra]) => letra);
  return <TelaBase title="Meu progresso">
    <EstadoAprendizagem />
    {carregado ? <>
      <Text style={{ fontSize: 22 }}>{AVATARES[perfil.avatar]} {perfil.apelido || "Meu perfil"}</Text>
      <Text>Letras visitadas: {progresso.letras.length} de 26</Text>
      <Text>Palavras com sílabas visitadas: {progresso.silabas.length} de 26</Text>
      <Text>Vogais reconhecidas na atividade: {reconhecidas.length} de 5</Text>
      {reconhecidas.length ? <Text>Você reconheceu: {reconhecidas.join(", ")}.</Text> : <Text>Experimente a atividade de vogais para registrar suas respostas.</Text>}
      <Text>Respostas registradas: {respostas.reduce((total, item) => total + item.tentativas, 0)}</Text>
      <Text>Este acompanhamento registra visitas e respostas. Você pode repetir no seu ritmo.</Text>
      <BotaoPrincipal title={progresso.ultima ? "Continuar de onde parei" : "Começar a aprender"} onPress={() => router.push(caminhoContinuar(progresso.ultima))} />
      <BotaoPrincipal title="Praticar vogais" onPress={() => router.push("/activity")} />
      <Text>Progresso salvo neste aparelho. Cada perfil tem seus próprios registros.</Text>
    </> : null}
  </TelaBase>;
}
