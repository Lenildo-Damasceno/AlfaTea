import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";

const ContextoAuth = createContext(null);
export const AuthContext = ContextoAuth;

export function ProvedorAuth({ children: conteudo }) {
  const [sessao, definirSessao] = useState(null);
  const [carregandoAuth, definirCarregandoAuth] = useState(true);

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

    const { data } = supabase.auth.onAuthStateChange((_evento, novaSessao) => {
      definirSessao(novaSessao);
      definirCarregandoAuth(false);
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  const valor = useMemo(
    () => ({
      sessao,
      usuario: sessao?.user ?? null,
      user: sessao?.user ?? null,
      carregandoAuth,
      entrarComEmailSenha,
      cadastrarComEmailSenha,
      sair,
    }),
    [sessao, carregandoAuth],
  );

  return <ContextoAuth.Provider value={valor}>{conteudo}</ContextoAuth.Provider>;
}

export function useAuth() {
  const contexto = useContext(ContextoAuth);
  if (!contexto) {
    throw new Error("useAuth precisa ser usado dentro de ProvedorAuth");
  }
  return contexto;
}
