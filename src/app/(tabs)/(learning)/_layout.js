import { Stack } from "expo-router";
import { useConfiguracoes } from "../../../contexts/SettingsContext";
import { CORES } from "../../../constants/theme";

export const unstable_settings = { initialRouteName: "learn" };

// As atividades de Aprender compartilham a mesma barra inferior.
export default function LayoutAprendizagem() {
  const { reduzirMovimento } = useConfiguracoes();
  return (
    <Stack screenOptions={{
      headerTintColor: CORES.primaria,
      contentStyle: { backgroundColor: CORES.fundo },
      animation: reduzirMovimento ? "none" : "default",
    }}>
      <Stack.Screen name="learn" options={{ title: "Alfatea" }} />
      <Stack.Screen name="activity" options={{ title: "Praticar vogais" }} />
    </Stack>
  );
}
