# Alfatea — Aprender no seu ritmo.

Aplicativo de apoio pedagógico em JavaScript + React Native + Expo.

## Executar

- `npm install`
- `npm start`
- `npm run android` com emulador ou dispositivo configurado.

## Estado da implementação

JavaScript, tema oficial, componentes nativos reutilizáveis e navegação Stack/Tabs com Expo Router em `src/app/`. Splash, Home, Sobre e configurações implementadas. As preferências usam AsyncStorage.

O módulo **Aprender → Letras** apresenta as 26 letras A–Z em cartões acessíveis. Cada letra abre uma tela com maiúscula, minúscula, palavra de exemplo e navegação anterior/próxima. Funciona com conteúdo local, sem internet. As letras usam texto nativo colorido inspirado na referência visual; ainda não são os assets ilustrados individuais. Áudios, exercícios e persistência de progresso continuam pendentes. Os outros módulos e a aba Progresso permanecem em preparação.

Após a mudança de navegação, reinicie o Metro com `npx expo start --clear`.

### Verificação manual do alfabeto

- Abrir Splash → Início → Aprender → Letras.
- Conferir as 26 letras, incluindo K, W e Y, e abrir A e Z.
- Avançar/voltar entre letras, retornar ao alfabeto e testar o botão voltar do Android.
- Testar fonte ampliada e leitor de tela; cada cartão deve anunciar a letra.
- Repetir sem internet após carregar o aplicativo no dispositivo.
- Conferir também as abas e os atalhos das configurações após a migração de rotas.

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

### Voz das letras

A tela de cada letra permite ouvir seu nome ao tocar na letra e oferece **Ouvir exemplo**, usando `expo-speech` em português do Brasil. O som só começa após um toque. A opção de som nas Configurações é salva junto das preferências de vibração. A fala é interrompida ao sair, trocar de letra ou colocar o aplicativo em segundo plano.

A voz depende do aparelho; não é uma voz Google fixa nem um MP3 incluído no app. O funcionamento sem internet depende da voz instalada e precisa ser testado no dispositivo. No iPhone, desligue o modo silencioso para testar. Revise a pronúncia de A–Z, especialmente as consoantes, K, W e Y. O botão de letra ensina o nome da letra, não seu fonema.

Teste toques rápidos, troca de telas durante a fala e a preferência de som após reiniciar o aplicativo. Os MP3 educativos revisados continuam planejados como alternativa para uma voz uniforme e offline.

Cores em `src/constants/theme.js`. Ícone, logo e Alfi acenando recriados a partir da referência visual recebida; detalhes em docs/ASSETS-ABERTURA.md. Tela de abertura integrada. Nenhum ícone genérico do template é configurado como identidade oficial. Nunito ainda será incorporada.

## Limites desta fase

Não é o MVP concluído e não contém instalador. O bundle Metro não substitui teste em dispositivo ou build EAS. As atividades principais deverão funcionar offline, sem coleta contínua de localização ou ranking entre crianças.


## Prepara??o para GitHub

C?digo, assets, documenta??o e package-lock.json devem ser versionados. Depend?ncias, caches, arquivos .env, credenciais, bancos locais e instaladores est?o ignorados. N?o coloque segredos em app.json ou no c?digo.

Ap?s clonar: `npm ci` e `npm start`. Para verificar o c?digo: `npm run lint`.

O projeto ainda n?o tem remoto configurado. Para conectar, use a URL do seu reposit?rio GitHub como origin; revise `git diff` e `git status` antes do commit e do envio.
