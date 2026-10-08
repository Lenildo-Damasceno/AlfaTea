import { Text } from "react-native";
import TelaBase from "../components/Screen";
import { CORES } from "../constants/theme";

// Informa que o modulo ainda esta em desenvolvimento.
export default function TelaEmPreparacao({ title: titulo = "Em preparação" }) {
  return (
    <TelaBase title={titulo}>
      <Text
        style={{
          color: CORES.texto,
          fontSize: 18,
        }}
      >
        Esta funcionalidade será implementada nas próximas fases do Alfatea.
      </Text>
    </TelaBase>
  );
}
