import { useEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BotaoPrincipal from "../components/PrimaryButton";
import { CORES, RAIOS } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

export default function TelaLogin() {
  const { modo: modoParam } = useLocalSearchParams();
  const modoInicial = modoParam === "signup" ? "signup" : "login";
  const [modo, definirModo] = useState(modoInicial);
  const [nome, definirNome] = useState("");
  const [idade, definirIdade] = useState("");
  const [email, definirEmail] = useState("");
  const [senha, definirSenha] = useState("");
  const [carregando, definirCarregando] = useState(false);

  const { usuario, entrarComEmailSenha, cadastrarComEmailSenha } = useAuth();

  const titulo = useMemo(
    () => (modo === "login" ? "Entrar na conta" : "Criar conta"),
    [modo],
  );

  useEffect(() => {
    if (usuario) router.replace("/home");
  }, [usuario]);

  async function enviar() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Preencha tudo", "Informe email e senha para continuar.");
      return;
    }

    if (modo === "signup") {
      const idadeNumerica = Number.parseInt(idade.trim(), 10);
      if (!nome.trim() || !idade.trim()) {
        Alert.alert("Preencha tudo", "Informe nome e idade para criar a conta.");
        return;
      }
      if (Number.isNaN(idadeNumerica) || idadeNumerica < 1 || idadeNumerica > 120) {
        Alert.alert("Idade inválida", "Informe uma idade entre 1 e 120.");
        return;
      }
    }

    definirCarregando(true);
    try {
      if (modo === "login") {
        await entrarComEmailSenha(email.trim().toLowerCase(), senha);
      } else {
        const resposta = await cadastrarComEmailSenha(
          email.trim().toLowerCase(),
          senha,
          {
            nome: nome.trim(),
            idade: Number.parseInt(idade.trim(), 10),
          },
        );
        if (!resposta.session) {
          Alert.alert(
            "Quase pronto",
            "Verifique seu email para confirmar a conta antes de entrar.",
          );
          definirNome("");
          definirIdade("");
          definirModo("login");
        }
      }
    } catch (error) {
      Alert.alert("Falha na autenticação", error?.message || "Tente novamente.");
    } finally {
      definirCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={estilos.tela}
    >
      <View style={estilos.cartao}>
        <Text style={estilos.titulo}>{titulo}</Text>
        <Text style={estilos.subtitulo}>
          {modo === "login"
            ? "Entre com seu email e senha."
            : "Crie sua conta para salvar progresso."}
        </Text>

        {modo === "signup" ? (
          <>
            <Text style={estilos.rotulo}>Nome do responsável</Text>
            <TextInput
              style={estilos.input}
              value={nome}
              onChangeText={definirNome}
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Nome completo"
            />

            <Text style={estilos.rotulo}>Idade</Text>
            <TextInput
              style={estilos.input}
              value={idade}
              onChangeText={definirIdade}
              keyboardType="number-pad"
              inputMode="numeric"
              maxLength={3}
              autoComplete="off"
              placeholder="Ex: 34"
            />
          </>
        ) : null}

        <Text style={estilos.rotulo}>Email</Text>
        <TextInput
          style={estilos.input}
          value={email}
          onChangeText={definirEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          placeholder="email@exemplo.com"
        />

        <Text style={estilos.rotulo}>Senha</Text>
        <TextInput
          style={estilos.input}
          value={senha}
          onChangeText={definirSenha}
          autoCapitalize="none"
          secureTextEntry
          autoComplete={modo === "login" ? "current-password" : "new-password"}
          placeholder="Sua senha"
        />

        <BotaoPrincipal
          title={modo === "login" ? "Entrar" : "Criar conta"}
          onPress={enviar}
        />

        {carregando ? (
          <ActivityIndicator color={CORES.primaria} style={estilos.loader} />
        ) : null}

        <Pressable
          onPress={() => {
            definirModo((atual) => (atual === "login" ? "signup" : "login"));
            definirSenha("");
          }}
        >
          <Text style={estilos.link}>
            {modo === "login"
              ? "Não tem conta? Cadastre-se"
              : "Já tem conta? Fazer login"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: CORES.fundo,
  },
  cartao: {
    backgroundColor: CORES.branco,
    borderRadius: RAIOS.cartao,
    padding: 20,
    gap: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: CORES.texto,
  },
  subtitulo: {
    fontSize: 15,
    color: CORES.texto,
    opacity: 0.8,
    marginBottom: 6,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: "600",
    color: CORES.texto,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C9D7E4",
    borderRadius: 12,
    fontSize: 16,
    color: CORES.texto,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FCFEFF",
  },
  link: {
    textAlign: "center",
    color: CORES.primaria,
    fontWeight: "600",
    fontSize: 15,
    marginTop: 4,
  },
  loader: {
    marginTop: 4,
  },
});
