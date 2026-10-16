import { useRef, useState } from "react";
import { ActivityIndicator, Text, TextInput } from "react-native";
import { router } from "expo-router";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import { useAuth } from "../contexts/AuthContext";
import { mensagemAuth } from "../services/authLinks";
import { CORES } from "../constants/theme";

export default function TelaRedefinirSenha() {
  const { recuperandoSenha, processandoLink, carregandoAuth, erroLink, redefinirSenha } = useAuth();
  const [senha, definirSenha] = useState("");
  const [confirmacao, definirConfirmacao] = useState("");
  const [visivel, definirVisivel] = useState(false);
  const [ocupado, definirOcupado] = useState(false);
  const [erro, definirErro] = useState("");
  const [concluido, definirConcluido] = useState(false);
  const bloqueio = useRef(false);
  async function salvar() {
    if (bloqueio.current) return;
    if (senha.length < 8) { definirErro("Use pelo menos 8 caracteres."); return; }
    if (senha !== confirmacao) { definirErro("As senhas precisam ser iguais."); return; }
    bloqueio.current = true; definirOcupado(true); definirErro("");
    try { await redefinirSenha(senha); definirSenha(""); definirConfirmacao(""); definirConcluido(true); }
    catch (falha) { definirErro(mensagemAuth(falha)); }
    finally { bloqueio.current = false; definirOcupado(false); }
  }
  if (carregandoAuth || processandoLink) return <TelaBase title="Verificando link"><ActivityIndicator accessibilityLabel="Verificando recuperação" /></TelaBase>;
  if (concluido) return <TelaBase title="Senha atualizada">
    <Text>Sua nova senha foi salva.</Text><BotaoPrincipal title="Continuar" onPress={() => router.replace("/home")} />
  </TelaBase>;
  if (!recuperandoSenha || erroLink) return <TelaBase title="Recuperar acesso">
    <Text accessibilityRole="alert">{erroLink || "Abra o link enviado ao seu e-mail para criar uma nova senha."}</Text>
    <BotaoPrincipal title="Solicitar outro link" onPress={() => router.replace("/forgot-password")} />
  </TelaBase>;
  return <TelaBase title="Criar nova senha">
    <Text>Use pelo menos 8 caracteres.</Text>
    {[{ valor: senha, definir: definirSenha, rotulo: "Nova senha" }, { valor: confirmacao, definir: definirConfirmacao, rotulo: "Confirmar nova senha" }].map((campo) =>
      <TextInput key={campo.rotulo} accessibilityLabel={campo.rotulo} placeholder={campo.rotulo} value={campo.valor}
        onChangeText={campo.definir} editable={!ocupado} secureTextEntry={!visivel} autoCapitalize="none" autoCorrect={false}
        autoComplete="new-password" style={{ borderWidth: 1, borderColor: CORES.texto, borderRadius: 12, padding: 16, fontSize: 18 }} />)}
    <BotaoPrincipal title={visivel ? "Ocultar senhas" : "Mostrar senhas"} disabled={ocupado} onPress={() => definirVisivel(!visivel)} />
    {erro ? <Text accessibilityRole="alert">{erro}</Text> : null}
    <BotaoPrincipal title="Salvar nova senha" loading={ocupado} onPress={salvar} />
  </TelaBase>;
}
