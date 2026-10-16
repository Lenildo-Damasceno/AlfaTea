// Não registrar URLs de autenticação: elas podem conter credenciais.
export function lerLinkAuth(valor) {
  if (!valor) return null;
  try {
    const url = new URL(valor);
    const caminho = url.protocol === "alfatea:" ? `/${url.hostname}${url.pathname}` : url.pathname.replace(/^\/--/, "");
    if (!["/auth/callback", "/auth/reset-password"].includes(caminho.replace(/\/$/, ""))) return null;
    const parametros = new URLSearchParams(url.search);
    new URLSearchParams(url.hash.slice(1)).forEach((conteudo, chave) => parametros.set(chave, conteudo));
    return {
      recuperacao: caminho.includes("reset-password") || parametros.get("type") === "recovery",
      codigo: parametros.get("code"),
      access_token: parametros.get("access_token"),
      refresh_token: parametros.get("refresh_token"),
      erro: parametros.get("error") || parametros.get("error_code"),
    };
  } catch { return null; }
}

export function mensagemAuth(erro) {
  const mensagens = {
    invalid_credentials: "E-mail ou senha incorretos.",
    email_not_confirmed: "Confirme seu e-mail antes de entrar.",
    over_email_send_rate_limit: "Aguarde alguns minutos antes de pedir outro e-mail.",
    over_request_rate_limit: "Aguarde alguns minutos e tente novamente.",
    weak_password: "Escolha uma senha mais forte, com pelo menos 8 caracteres.",
    same_password: "Escolha uma senha diferente da anterior.",
    otp_expired: "Este link expirou. Solicite outro e-mail.",
  };
  return mensagens[erro?.code] || "Não foi possível concluir. Confira sua conexão e tente novamente.";
}
