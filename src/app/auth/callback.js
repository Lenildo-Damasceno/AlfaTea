import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { CORES } from "../../constants/theme";
import { supabase } from "../../services/supabase";

export default function AuthCallback() {
  useEffect(() => {
    let ativo = true;

    async function confirmarSessao() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn("Erro ao obter sessão após confirmação:", error.message);
        }

        if (!ativo) return;

        if (data?.session) {
          router.replace("/home");
          return;
        }
      } catch (erro) {
        console.warn("Falha no callback de confirmação:", erro);
      }

      setTimeout(() => {
        if (ativo) router.replace("/login");
      }, 1500);
    }

    confirmarSessao();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <View style={estilos.tela}>
      <View style={estilos.card}>
        <Text style={estilos.titulo}>E-mail confirmado!</Text>
        <Text style={estilos.texto}>Você pode voltar ao app.</Text>
        <ActivityIndicator color={CORES.primaria} style={estilos.loader} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CORES.fundo,
    padding: 24,
  },
  card: {
    backgroundColor: CORES.branco,
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    gap: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: CORES.texto,
    textAlign: "center",
  },
  texto: {
    fontSize: 16,
    color: CORES.texto,
    opacity: 0.8,
    textAlign: "center",
  },
  loader: {
    marginTop: 8,
  },
});
