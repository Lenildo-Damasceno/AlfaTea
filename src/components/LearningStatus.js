import { ActivityIndicator, Text, View } from "react-native";
import { useAprendizagem } from "../contexts/LearningContext";
import { useAuth } from "../contexts/AuthContext";
import BotaoPrincipal from "./PrimaryButton";
import { CORES } from "../constants/theme";

export default function EstadoAprendizagem() {
  const { carregado, erro, tentarNovamente } = useAprendizagem();
  const { usuario } = useAuth();
  if (!usuario) return null;
  if (erro) return <View style={{ gap: 12 }}>
    <Text accessibilityRole="alert">{erro}</Text>
    <BotaoPrincipal title="Tentar carregar novamente" onPress={tentarNovamente} />
  </View>;
  if (!carregado) return <ActivityIndicator color={CORES.primaria} accessibilityLabel="Carregando perfil e progresso" />;
  return null;
}
