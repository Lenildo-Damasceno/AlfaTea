import { ScrollView, Text, StyleSheet } from "react-native";
import { CORES } from "../constants/theme";

// Organiza o titulo e o conteudo em uma tela com rolagem.
export default function TelaBase({ title: titulo, children: conteudo }) {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      {titulo ? <Text accessibilityRole="header" style={estilos.titulo}>
        {titulo}
      </Text> : null}
      {conteudo}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudo: {
    padding: 24,
    gap: 20,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "800",
    color: CORES.primaria,
  },
});
