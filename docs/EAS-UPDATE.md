# APK e atualizações do AlfaTea

O perfil `preview` gera APK de distribuição interna, ligado ao canal e ao ambiente EAS `preview`. O perfil `production` usa o canal e o ambiente `production`.

O app usa `expo-updates` e a política `runtimeVersion: fingerprint`. Mudanças que alteram a parte nativa exigem um novo build; ajustes compatíveis de telas, textos e lógica podem ser publicados pelo EAS Update.

## Gerar o APK

```powershell
npm.cmd run build:preview
```

Instale o APK resultante no Android. Um APK antigo que ainda não inclui `expo-updates` precisa ser substituído por este novo build.

## Publicar uma atualização depois

```powershell
npm.cmd run update:preview -- --message "Descrição da mudança"
```

O comando usa o canal e o ambiente `preview`. Ele publica apenas para builds Android/iOS compatíveis com o runtime gerado. A configuração padrão consulta atualizações ao abrir o app e aplica uma atualização baixada na próxima inicialização. Para testar, feche completamente e reabra o app; aguarde o download e repita.

## Variáveis

O ambiente EAS `preview` precisa conter `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Os redirecionamentos de autenticação podem usar os padrões nativos ou as variáveis opcionais de `.env.example`. Os valores `EXPO_PUBLIC_` fazem parte do app e devem conter somente configurações públicas.

O `.env` local e credenciais continuam fora do versionamento. Builds e updates usam o mesmo ambiente EAS. Para produção, configure e confira o ambiente `production` antes de publicar.

Referências: [Configuração do EAS Update](https://docs.expo.dev/eas-update/getting-started/) e [Compatibilidade por runtime](https://docs.expo.dev/eas-update/runtime-versions/).
