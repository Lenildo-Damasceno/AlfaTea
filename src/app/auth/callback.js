import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { router } from "expo-router";
import TelaBase from "../../components/Screen";
import BotaoPrincipal from "../../components/PrimaryButton";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthCallback() {
  const { usuario, carregandoAuth, processandoLink, erroLink, recuperandoSenha } = useAuth();
  const aguardando = carregandoAuth || processandoLink;
  useEffect(() => {
    if (aguardando || erroLink) return;
    if (recuperandoSenha) router.replace("/auth/reset-password");
    else if (usuario) router.replace("/home");
  }, [aguardando, erroLink, recuperandoSenha, usuario]);
  return <TelaBase title="Confirmar e-mail">
    {aguardando ? <ActivityIndicator accessibilityLabel="Verificando confirmação" /> : null}
    <Text accessibilityRole={erroLink ? "alert" : "text"}>{erroLink || (aguardando ? "Verificando seu link..." : "Entre na sua conta para continuar.")}</Text>
    {!aguardando ? <BotaoPrincipal title="Voltar para o login" onPress={() => router.replace("/login")} /> : null}
  </TelaBase>;
}