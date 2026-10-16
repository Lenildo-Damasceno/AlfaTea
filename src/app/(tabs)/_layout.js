import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { CORES } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
const icones = {
  home: "⌂",
  "(learning)": "ABC",
  progress: "☆",
  settings: "⚙",
};

// Organiza as quatro abas principais do aplicativo.
export default function LayoutAbas() {
  const { carregandoAuth, usuario, recuperandoSenha, processandoLink } = useAuth();

  if (carregandoAuth || processandoLink) return null;
  if (recuperandoSenha) return <Redirect href="/auth/reset-password" />;
  if (!usuario) return <Redirect href="/login" />;

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({ route: rota }) => ({
        headerTitle: "Alfatea",
        headerTintColor: CORES.primaria,
        tabBarActiveTintColor: CORES.primaria,
        tabBarInactiveTintColor: CORES.texto,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color: cor }) => (
          <Text
            accessible={false}
            style={{
              color: cor,
              fontSize: rota.name === "(learning)" ? 13 : 24,
            }}
          >
            {icones[rota.name]}
          </Text>
        ),
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
        }}
      />
      <Tabs.Screen
        name="(learning)"
        options={{
          title: "Aprender",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progresso",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configurações",
        }}
      />
    </Tabs>
  );
}
