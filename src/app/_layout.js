import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProvedorConfiguracoes, useConfiguracoes } from "../contexts/SettingsContext";
import { ProvedorAuth } from "../contexts/AuthContext";
import { ProvedorAprendizagem } from "../contexts/LearningContext";
import { CORES } from "../constants/theme";

// Define as rotas e os provedores compartilhados do aplicativo.
export default function LayoutPrincipal() {
  return (
    <SafeAreaProvider>
      <ProvedorConfiguracoes>
        <ProvedorAuth>
          <ProvedorAprendizagem>
            <NavegacaoPrincipal />
          </ProvedorAprendizagem>
        </ProvedorAuth>
      </ProvedorConfiguracoes>
    </SafeAreaProvider>
  );
}

function NavegacaoPrincipal() {
  const { reduzirMovimento } = useConfiguracoes();
  return <>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              animation: reduzirMovimento ? "none" : "default",
              headerTintColor: CORES.primaria,
              contentStyle: {
                backgroundColor: CORES.fundo,
              },
            }}
          >
            <Stack.Screen name="forgot-password" options={{ title: "Recuperar acesso" }} />
            <Stack.Screen name="auth/callback" options={{ title: "Confirmar e-mail" }} />
            <Stack.Screen name="auth/reset-password" options={{ title: "Nova senha" }} />
            <Stack.Screen name="profile" options={{ title: "Perfis de aprendizagem" }} />
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                title: "Entrar",
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="letters/index"
              options={{
                title: "Alfabeto",
              }}
            />
            <Stack.Screen
              name="letters/[letter]"
              options={{
                title: "Conhecer a letra",
              }}
            />
            <Stack.Screen
              name="syllables/index"
              options={{ title: "Sílabas" }}
            />
            <Stack.Screen
              name="syllables/[letter]"
              options={{ title: "Conhecer as sílabas" }}
            />
            <Stack.Screen
              name="module"
              options={{
                title: "Aprender",
              }}
            />
            <Stack.Screen
              name="device"
              options={{
                title: "Dispositivo",
              }}
            />
            <Stack.Screen
              name="nearby"
              options={{
                title: "Recursos próximos",
              }}
            />
            <Stack.Screen
              name="about"
              options={{
                title: "Sobre",
              }}
            />
          </Stack>
    </>;
}
