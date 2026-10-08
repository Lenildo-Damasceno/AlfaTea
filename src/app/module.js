import { useLocalSearchParams } from "expo-router";
import TelaEmPreparacao from "../screens/TelaEmPreparacao";

// Le o modulo solicitado e abre sua tela de preparacao.
export default function RotaModulo() {
  const { module: modulo } = useLocalSearchParams();
  return (
    <TelaEmPreparacao
      title={typeof modulo === "string" ? modulo : "Em preparação"}
    />
  );
}
