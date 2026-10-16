import { useRef, useState } from "react";
import { Text, TextInput } from "react-native";
import { router } from "expo-router";
import TelaBase from "../components/Screen";
import BotaoPrincipal from "../components/PrimaryButton";
import { useAuth } from "../contexts/AuthContext";
import { mensagemAuth } from "../services/authLinks";
import { CORES } from "../constants/theme";

export default function TelaRecuperarSenha() {
  const { recuperarSenha } = useAuth();
  const [email, definirEmail] = useState("");
  const [carregando, definirCarregando] = useState(false);
  const [enviado, definirEnviado] = useState(false);
  const [erro, definirErro] = useState("");
  const bloqueio = useRef(false);
  async function enviar() {
    if (bloqueio.current) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { definirErro("Informe um e-mail válido."); return; }
    bloqueio.current = true; definirCarregando(true); definirErro("");
    try { await recuperarSenha(email.trim().toLowerCase()); definirEnviado(true); }
    catch (falha) { definirErro(mensagemAuth(falha)); }
    finally { bloqueio.current = false; definirCarregando(false); }
  }
  return <TelaBase title="Esqueci minha senha">
    <Text>{enviado ? "Se houver uma conta com esse e-mail, você receberá um link para criar uma nova senha. Confira também o spam." : "Informe o e-mail da conta do responsável."}</Text>
    {!enviado ? <>
      <TextInput accessibilityLabel="E-mail da conta" placeholder="email@exemplo.com" value={email} onChangeText={definirEmail}
        editable={!carregando} autoCapitalize="none" autoComplete="email" keyboardType="email-address"
        style={{ fontSize: 18, padding: 16, borderWidth: 1, borderColor: CORES.texto, borderRadius: 12 }} />
      <BotaoPrincipal title="Enviar link de recuperação" loading={carregando} onPress={enviar} />
    </> : null}
    {erro ? <Text accessibilityRole="alert">{erro}</Text> : null}
    <BotaoPrincipal title="Voltar para o login" disabled={carregando} onPress={() => router.replace("/login")} />
  </TelaBase>;
}
