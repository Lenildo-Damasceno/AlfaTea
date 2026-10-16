import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createURL, useLinkingURL } from "expo-linking";
import { supabase } from "../services/supabase";
import { lerLinkAuth } from "../services/authLinks";

const ContextoAuth = createContext(null);
export const AuthContext = ContextoAuth;

export function ProvedorAuth({ children: conteudo }) {
  const [sessao, definirSessao] = useState(null);
  const [carregandoAuth, definirCarregandoAuth] = useState(true);
  const [recuperandoSenha, definirRecuperandoSenha] = useState(false);
  const [statusLink, definirStatusLink] = useState({ url: null, erro: "" });
  const url = useLinkingURL();
  const operacaoLink = useRef(null);
  const link = useMemo(() => lerLinkAuth(url), [url]);
  const linkPendente = Boolean(link && statusLink.url !== url);
  const erroLink = statusLink.url === url ? statusLink.erro : "";

  useEffect(() => {
    if (!link) return;
    let ativo = true;
    async function consumir() {
      if (link.erro) throw new Error("Link inválido.");
      let resultado;
      if (link.codigo) resultado = await supabase.auth.exchangeCodeForSession(link.codigo);
      else if (link.access_token && link.refresh_token) resultado = await supabase.auth.setSession({
        access_token: link.access_token, refresh_token: link.refresh_token,
      });
      else throw new Error("Link incompleto.");
      if (resultado.error || !resultado.data.session) throw new Error("Link inválido.");
    }
    // Reutiliza a operação no replay de efeitos do StrictMode (códigos são de uso único).
    if (operacaoLink.current?.url !== url) operacaoLink.current = { url, promessa: consumir() };
    operacaoLink.current.promessa.then(() => {
      if (!ativo) return;
      definirRecuperandoSenha(link.recuperacao);
      definirStatusLink({ url, erro: "" });
    }).catch(() => {
      if (!ativo) return;
      definirStatusLink({ url, erro: "Este link é inválido ou expirou. Solicite um novo e-mail." });
      definirRecuperandoSenha(false);
    });
    return () => { ativo = false; };
  }, [url, link]);

  useEffect(() => {
    let ativo = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!ativo) return;
        if (error) {
          console.warn("Falha ao recuperar sessão:", error.message);
          definirSessao(null);
        } else {
          definirSessao(data.session);
        }
      })
      .finally(() => {
        if (ativo) definirCarregandoAuth(false);
      });

    const { data } = supabase.auth.onAuthStateChange((evento, novaSessao) => {
      definirSessao(novaSessao);
      definirCarregandoAuth(false);
      if (evento === "PASSWORD_RECOVERY") definirRecuperandoSenha(true);
      if (evento === "SIGNED_OUT") definirRecuperandoSenha(false);
    });

    return () => {
      ativo = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function entrarComEmailSenha(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    if (error) throw error;
    return data;
  }

  async function cadastrarComEmailSenha(email, senha, perfil = {}) {
    const redirectParaConfirmacao =
      process.env.EXPO_PUBLIC_AUTH_CONFIRMATION_URL ||
      process.env.EXPO_PUBLIC_AUTH_REDIRECT_URL ||
      createURL("auth/callback", { scheme: "alfatea" });

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        emailRedirectTo: redirectParaConfirmacao,
        data: {
          nome: perfil.nome || "",
          idade: Number.isFinite(perfil.idade) ? perfil.idade : null,
        },
      },
    });
    if (error) throw error;
    return data;
  }

  async function sair() {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) throw error;
  }

  async function recuperarSenha(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.EXPO_PUBLIC_AUTH_PASSWORD_RESET_URL || createURL("auth/reset-password", { scheme: "alfatea" }),
    });
    if (error) throw error;
  }

  async function redefinirSenha(senha) {
    if (!recuperandoSenha || !sessao) throw new Error("Solicite um novo link de recuperação.");
    const { error } = await supabase.auth.updateUser({ password: senha });
    if (error) throw error;
    definirRecuperandoSenha(false);
  }

  const valor = {
      sessao,
      usuario: sessao?.user ?? null,
      user: sessao?.user ?? null,
      carregandoAuth,
      entrarComEmailSenha,
      cadastrarComEmailSenha,
      sair,
      recuperarSenha,
      redefinirSenha,
      recuperandoSenha,
      processandoLink: linkPendente,
      erroLink,
    };

  return <ContextoAuth.Provider value={valor}>{conteudo}</ContextoAuth.Provider>;
}

export function useAuth() {
  const contexto = useContext(ContextoAuth);
  if (!contexto) {
    throw new Error("useAuth precisa ser usado dentro de ProvedorAuth");
  }
  return contexto;
}
