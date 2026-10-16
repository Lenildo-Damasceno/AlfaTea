import { useEffect, useMemo, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BotaoPrincipal from "../components/PrimaryButton";
import { CORES, RAIOS } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";
import { mensagemAuth } from "../services/authLinks";

export default function TelaLogin() {
  const { modo: modoParam } = useLocalSearchParams();
  const modoInicial = modoParam === "signup" ? "signup" : "login";
  const [modo, definirModo] = useState(modoInicial);
  const [nome, definirNome] = useState("");
  const [idade, definirIdade] = useState("");
  const [email, definirEmail] = useState("");
  const [senha, definirSenha] = useState("");
  const [carregando, definirCarregando] = useState(false);
  const [mostrarSenha, definirMostrarSenha] = useState(false);
  const bloqueio = useRef(false);

  const { usuario, entrarComEmailSenha, cadastrarComEmailSenha, recuperandoSenha, processandoLink, carregandoAuth } = useAuth();

  const titulo = useMemo(
    () => (modo === "login" ? "Entrar na conta" : "Criar conta"),
    [modo],
  );

  useEffect(() => {
    if (carregandoAuth || processandoLink) return;
    if (recuperandoSenha) router.replace("/auth/reset-password");
    else if (usuario) router.replace("/home");
  }, [usuario, recuperandoSenha, processandoLink, carregandoAuth]);

  async function enviar() {
    if (bloqueio.current) return;
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Preencha tudo", "Informe email e senha para continuar.");
      return;
    }

    if (modo === "signup") {
      if (senha.length < 8) {
        Alert.alert("Escolha uma senha mais forte", "Use pelo menos 8 caracteres.");
        return;
      }
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

    bloqueio.current = true;
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

        const precisaConfirmarEmail =
          !resposta?.session || !resposta?.user?.email_confirmed_at;

        if (precisaConfirmarEmail) {
          Alert.alert(
            "Confirme seu e-mail",
            "Verifique sua caixa de entrada e confirme o e-mail antes de entrar.",
          );
          definirNome("");
          definirIdade("");
          definirEmail("");
          definirSenha("");
          definirModo("login");
        }
      }
    } catch (error) {
      Alert.alert("Falha na autenticação", mensagemAuth(error));
    } finally {
      definirCarregando(false);
      bloqueio.current = false;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={estilos.tela}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
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
              editable={!carregando}
              accessibilityLabel="Nome do responsável"
              onChangeText={definirNome}
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Nome completo"
            />

            <Text style={estilos.rotulo}>Idade</Text>
            <TextInput
              style={estilos.input}
              value={idade}
              editable={!carregando}
              accessibilityLabel="Idade do responsável"
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
          editable={!carregando}
          accessibilityLabel="E-mail da conta"
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
          editable={!carregando}
          accessibilityLabel="Senha"
          onChangeText={definirSenha}
          autoCapitalize="none"
          secureTextEntry={!mostrarSenha}
          autoCorrect={false}
          autoComplete={modo === "login" ? "current-password" : "new-password"}
          placeholder="Sua senha"
        />

        <Pressable accessibilityRole="button" disabled={carregando} onPress={() => definirMostrarSenha(!mostrarSenha)} style={estilos.acaoTexto}>
          <Text style={estilos.link}>{mostrarSenha ? "Ocultar senha" : "Mostrar senha"}</Text>
        </Pressable>
        {modo === "login" ? <Pressable accessibilityRole="button" disabled={carregando}
          onPress={() => router.push("/forgot-password")} style={estilos.acaoTexto}>
          <Text style={estilos.link}>Esqueci minha senha</Text>
        </Pressable> : null}

        <BotaoPrincipal
          title={modo === "login" ? "Entrar" : "Criar conta"}
          onPress={enviar}
          loading={carregando}
          disabled={carregandoAuth || processandoLink}
        />

        <Pressable
          accessibilityRole="button"
          disabled={carregando}
          style={estilos.acaoTexto}
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
      </ScrollView>
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
  acaoTexto: { minHeight: 48, justifyContent: "center" },
});
