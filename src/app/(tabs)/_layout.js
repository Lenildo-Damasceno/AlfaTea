import { Tabs } from "expo-router";
import { Text } from "react-native";
import { CORES } from "../../constants/theme";
const icones = {
  home: "⌂",
  learn: "ABC",
  progress: "☆",
  settings: "⚙",
};

// Organiza as quatro abas principais do aplicativo.
export default function LayoutAbas() {
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
              fontSize: rota.name === "learn" ? 13 : 24,
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
        name="learn"
        options={{
          title: "Aprender",
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
