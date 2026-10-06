# Alfatea — Aprender no seu ritmo.

Aplicativo de apoio pedagógico em JavaScript + React Native + Expo.

## Executar

- `npm install`
- `npm start`
- `npm run android` com emulador ou dispositivo configurado.

## Estado da implementação

Fase 1: template JavaScript, tema oficial, componentes nativos reutilizáveis, Stack e Tabs. Home e Sobre iniciadas, com link externo. Módulos e progresso exibem placeholders explícitos; ainda não há atividades nem dados persistidos.

O documento oficial está em `docs/PROMPT-MESTRE.md`. Na inspeção inicial a pasta estava vazia, sem package.json, dependências, telas ou assets.

## Próximas fases, na ordem do documento

- Splash, finalização da Home e assets oficiais.
- Letras A–Z e primeira atividade.
- Context API e AsyncStorage.
- SQLite e recuperação de progresso.
- Sílabas e palavras.
- Áudio educativo offline: MP3 locais + `expo-audio`, controle de som e revisão de pronúncias. Planejamento em [Fase de áudio](docs/FASE-AUDIO.md).
- Notificações e haptics.
- Informações do dispositivo.
- Localização opcional.
- API complementar com estados de loading, erro e offline.
- Testes em dispositivo e instalador Android via EAS; preparação iOS.

## Identidade visual

Cores em `src/constants/theme.js`. Ícone, logo e Alfi acenando recriados a partir da referência visual recebida; detalhes em docs/ASSETS-ABERTURA.md. Tela de abertura integrada. Nenhum ícone genérico do template é configurado como identidade oficial. Nunito ainda será incorporada.

## Limites desta fase

Não é o MVP concluído e não contém instalador. O bundle Metro não substitui teste em dispositivo ou build EAS. As atividades principais deverão funcionar offline, sem coleta contínua de localização ou ranking entre crianças.


## Prepara??o para GitHub

C?digo, assets, documenta??o e package-lock.json devem ser versionados. Depend?ncias, caches, arquivos .env, credenciais, bancos locais e instaladores est?o ignorados. N?o coloque segredos em app.json ou no c?digo.

Ap?s clonar: `npm ci` e `npm start`. Para verificar o c?digo: `npm run lint`.

O projeto ainda n?o tem remoto configurado. Para conectar, use a URL do seu reposit?rio GitHub como origin; revise `git diff` e `git status` antes do commit e do envio.
