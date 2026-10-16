# Melhorias graduais — 15/10/2026

## Entregas de código

1. Abertura com **Continuar** quando a conta já está conectada; aguarda a recuperação da sessão.
2. Progresso local: visitas únicas a letras e sílabas, tentativas, acertos, data das respostas e última tela. SQLite no celular; AsyncStorage na web. A fila de gravação evita perder atualizações simultâneas.
3. Atividade de reconhecimento de cinco vogais, três opções por rodada e tentativas sem limite. As respostas só são confirmadas depois de salvas. Visitar uma tela e reconhecer uma vogal têm indicadores separados.
4. Recuperação por e-mail e criação de nova senha, suporte a links com tokens ou código, mensagens em português, mostrar/ocultar senha e bloqueio de envios repetidos. O logout encerra a sessão neste dispositivo.
5. Reprodução local com um controlador compartilhado. Os 36 WAVs são **rascunhos aguardando revisão**; somente itens marcados `revisado: true` entram nas atividades. Até lá, usa-se a voz do aparelho.
6. Pular apresentação nesta abertura, preferência persistida para pular o vídeo e redução de movimento (inclui a preferência do sistema). Contraste dos botões reforçado, opções grandes e campos com nomes acessíveis.
7. Apelido e avatar de quem aprende, com vários perfis locais por conta. A saudação passa a usar o apelido, preservando o cadastro do responsável.

## Configuração e limites

- No Supabase, autorizar `alfatea://auth/callback` e `alfatea://auth/reset-password` em **Authentication → URL Configuration → Redirect URLs**. Essas configurações externas não foram alteradas. Na web, configurar as variáveis de redirecionamento com a URL HTTPS correspondente; exemplos em `.env.example`.
- O envio e a entrega dos e-mails dependem da configuração do Supabase. Validar com uma conta de teste e links reais no dispositivo.
- Gerar novo development build para incluir `expo-sqlite` e `expo-audio`. Nenhum arquivo nativo foi editado. O áudio usa apenas reprodução, sem permissão de microfone ou execução em segundo plano.
- Dados de aprendizagem ficam neste aparelho/navegador. Desinstalar ou limpar os dados pode apagá-los. Sincronização entre aparelhos não está implementada.
- O projeto continua em JavaScript. `npm run typecheck` usa a configuração base do Expo, sem ativar `checkJs` global ou converter o projeto para TypeScript.

## Verificação

Automática: `npm test`, `npm run lint` e `npm run typecheck`. Os testes verificam gravação e reabertura de SQLite, separação por conta e perfil, concorrência, recuperação após falha de escrita, preservação de dados ilegíveis, rodadas de vogais e interpretação de links de autenticação.

Validar em Android e iOS: fechar/reabrir com sessão salva; usar **Sair da conta**; trocar de conta e de perfil; visitar letras/sílabas e retomar; responder incorretamente e tentar novamente; tocar rapidamente nas opções; usar sem rede após o login; revisar e repetir áudios; interromper ao minimizar ou sair; recuperar senha com app aberto e fechado; testar link vencido; testar fonte ampliada, TalkBack/VoiceOver, teclado e redução de movimento.
