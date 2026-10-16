import test from "node:test";
import assert from "node:assert/strict";
import { lerLinkAuth, mensagemAuth } from "../src/services/authLinks.js";

test("reconhece recuperação por fragmento no app e por código na web", () => {
  const nativo = lerLinkAuth("alfatea://auth/reset-password#access_token=exemplo&refresh_token=renovar&type=recovery");
  assert.equal(nativo.recuperacao, true);
  assert.equal(nativo.access_token, "exemplo");
  assert.equal(nativo.refresh_token, "renovar");
  const web = lerLinkAuth("https://alfatea.example/auth/reset-password?code=uso-unico");
  assert.equal(web.codigo, "uso-unico");
  assert.equal(web.recuperacao, true);
});

test("confirmação e link expirado não são confundidos com recuperação válida", () => {
  assert.equal(lerLinkAuth("alfatea://auth/callback?code=confirmar").recuperacao, false);
  assert.equal(lerLinkAuth("alfatea://auth/reset-password#error_code=otp_expired").erro, "otp_expired");
  assert.equal(lerLinkAuth("exp://127.0.0.1:8081/--/auth/callback?code=dev").codigo, "dev");
  assert.equal(lerLinkAuth("alfatea://letters/A#access_token=qualquer"), null);
  assert.equal(lerLinkAuth("isso não é uma URL"), null);
});

test("erros técnicos não são exibidos diretamente ao usuário", () => {
  assert.equal(mensagemAuth({ code: "invalid_credentials" }), "E-mail ou senha incorretos.");
  assert.ok(!mensagemAuth(new Error("SQL internal details")).includes("SQL"));
});
