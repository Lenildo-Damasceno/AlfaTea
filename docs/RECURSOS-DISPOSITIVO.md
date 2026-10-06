# Recursos do dispositivo

Implementados em JavaScript usando Expo SDK 57:

- SettingsContext: Context API e useState/useEffect; AsyncStorage guarda a preferência de vibração. Padrão desligado.
- notifications.js: notificação local diária às 18h do celular, sem som/vibração, identificador fixo evita duplicação. Ativar pede permissão; desligar cancela. A lista de agendamentos do sistema é a fonte persistente do estado do lembrete e é reconsultada ao retornar ao app.
- SettingsScreen: switches e botão para experimentar feedback leve. O método feedback(correct) do contexto está disponível para futuras atividades, que ainda não estão implementadas.
- DeviceInfoScreen: sistema, versão, tipo, marca, fabricante, modelo, versão do app e build; sem identificadores pessoais.
- NearbyResourcesScreen: localização em primeiro plano somente após toque e autorização, sem banco, transmissão ou rastreamento. Exibe coordenadas arredondadas. Busca de instituições ainda não implementada.

## Validação manual em Android e iOS

1. Abrir sem aparecer solicitação de permissão.
2. Ativar vibração, experimentar, desativar e conferir ausência de feedback. Fechar/reabrir e verificar preferência.
3. Negar notificações e verificar mensagem sem ativar o switch. Autorizar no sistema e ativar novamente. Conferir um único agendamento; desativar e conferir cancelamento. Validar recebimento às 18h em build instalado.
4. Conferir dados reais do aparelho. Expo Go pode informar versão do hospedeiro.
5. Consultar localização: negar e continuar navegando; autorizar; testar GPS desligado; voltar e verificar que não houve persistência de coordenadas.

Bundle Android validado; testes físicos de permissões, entrega de notificações e haptics ainda pendentes. Alterações nativas de app.json exigem novo build. Não há API externa implementada nesta etapa.

Referências: https://docs.expo.dev/versions/v57.0.0/sdk/notifications/ , https://docs.expo.dev/versions/v57.0.0/sdk/location/ , https://docs.expo.dev/versions/v57.0.0/sdk/device/ , https://docs.expo.dev/versions/v57.0.0/sdk/haptics/
