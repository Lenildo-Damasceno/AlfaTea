# PROMPT MESTRE — PROJETO ALFATEA

Quero que você desenvolva comigo um aplicativo chamado **Alfatea**.

Leia todo este documento antes de alterar ou criar código.

Este documento contém as definições oficiais do projeto e substitui orientações técnicas anteriores que possam entrar em conflito com ele.

---

# 1. NOME

**Alfatea**

Slogan:

**“Aprender no seu ritmo.”**

---

# 2. OBJETIVO

O Alfatea é um aplicativo educacional para auxiliar no processo de alfabetização de crianças com Transtorno do Espectro Autista (TEA), especialmente níveis de suporte 1 e 2.

O aplicativo é uma ferramenta de **apoio pedagógico**.

Não apresentar o Alfatea como ferramenta de diagnóstico ou tratamento.

O aplicativo deverá trabalhar principalmente:

- letras;
- sons;
- sílabas;
- palavras;
- associação entre imagens e palavras;
- formação de palavras;
- exercícios;
- repetição;
- progresso da aprendizagem.

---

# 3. TECNOLOGIA OBRIGATÓRIA

A professora determinou que o projeto utilize:

**JavaScript + React Native + Expo**

Isso é obrigatório.

NÃO utilizar:

- Kotlin;
- Jetpack Compose;
- Android nativo como tecnologia principal;
- TypeScript;
- `.ts`;
- `.tsx`.

Utilizar arquivos JavaScript:

- `.js`
- eventualmente `.jsx`, se realmente necessário.

Preferencialmente utilizar `.js`.

---

# 4. CONTEÚDOS OBRIGATÓRIOS DA DISCIPLINA

O aplicativo precisa demonstrar:

1. React Native
2. Expo
3. Componentes Nativos
4. Hooks `useState`
5. Hooks `useEffect`
6. Stack Navigation
7. Tab Navigation
8. Link / Linking
9. Context API
10. Storage
11. SQLite
12. Notificações
13. Vibração
14. Informações do dispositivo
15. Geolocalização
16. Comunicação com API pública ou backend
17. Geração de instalador Android
18. Possibilidade de build para Apple/iOS

Todos esses requisitos devem ser implementados de forma clara e demonstrável.

---

# 5. IDENTIDADE VISUAL

A identidade visual do Alfatea já foi definida.

Não criar outra identidade sem autorização.

O estilo deverá ser:

- moderno;
- infantil;
- acolhedor;
- educativo;
- amigável;
- limpo;
- organizado;
- arredondado;
- colorido sem excesso;
- com poucos estímulos simultâneos.

Não criar uma interface excessivamente estimulante.

---

# 6. CORES OFICIAIS

## Azul principal

HEX:

`#2878D0`

Utilizar em:

- botões principais;
- títulos;
- navegação;
- identidade visual.

---

## Verde

HEX:

`#43A86B`

Utilizar em:

- progresso;
- acertos;
- elementos positivos;
- detalhes do Alfi.

---

## Amarelo

HEX:

`#F5C84C`

Utilizar em:

- estrelas;
- recompensas;
- destaques;
- medalhas;
- elementos especiais.

---

## Fundo

HEX:

`#F7FAFC`

Fundo principal das telas.

---

## Texto

HEX:

`#243447`

Cor principal dos textos.

---

## Vermelho suave

HEX:

`#D95C5C`

Utilizar apenas para:

- atenção;
- erro;
- tentativa incorreta.

Não utilizar vermelho agressivo.

---

# 7. TEMA JAVASCRIPT

Criar algo semelhante a:

```javascript
export const COLORS = {
  primary: '#2878D0',
  secondary: '#43A86B',
  accent: '#F5C84C',
  background: '#F7FAFC',
  text: '#243447',
  error: '#D95C5C',
  white: '#FFFFFF',
};
```

Centralizar as cores para evitar valores espalhados pelo código.

---

# 8. TIPOGRAFIA

Utilizar preferencialmente:

**Nunito**

A fonte deve ser:

- amigável;
- arredondada;
- muito legível.

Criar hierarquia clara entre:

- título;
- subtítulo;
- texto;
- botão;
- instrução.

---

# 9. MASCOTE

O mascote oficial é:

# ALFI

Alfi é um dinossauro.

O design visual já foi aprovado.

Características:

- dinossauro azul;
- detalhes verdes;
- barriga verde-clara;
- olhos grandes;
- formas arredondadas;
- aparência moderna;
- simpático;
- amigável;
- expressivo.

Não redesenhar o personagem de forma diferente em cada tela.

---

# 10. PERSONALIDADE DO ALFI

Alfi deve transmitir:

- amizade;
- paciência;
- curiosidade;
- alegria;
- incentivo;
- segurança.

Ele funciona como companheiro da criança durante o aprendizado.

Nunca deve repreender a criança.

---

# 11. FRASES DO ALFI

Acerto:

**“Muito bem!”**

**“Parabéns!”**

**“Você conseguiu!”**

Erro:

**“Vamos tentar novamente?”**

**“Quase! Tente mais uma vez.”**

Incentivo:

**“Você consegue!”**

---

# 12. ASSETS DO ALFI

Os assets devem ser separados.

Exemplo:

```text
assets/
  images/
    alfi/
      alfi_neutro.png
      alfi_ola.png
      alfi_apontando.png
      alfi_lendo.png
      alfi_comemorando.png
      alfi_pensando.png
      alfi_incentivando.png
      alfi_acerto.png
      alfi_erro.png
```

Utilizar fundo transparente nos personagens isolados.

IMPORTANTE:

Não utilizar uma imagem grande contendo todas as poses.

Cada pose deverá ser um arquivo independente.

---

# 13. LOGOTIPO

Criar estrutura:

```text
assets/images/branding/
```

Arquivos:

```text
logo_alfatea.png
logo_alfatea_horizontal.png
icone_alfatea.png
```

O ícone do aplicativo poderá utilizar o rosto do Alfi.

---

# 14. ESTRUTURA DE ASSETS

Organizar aproximadamente:

```text
assets/

  images/

    branding/

    alfi/

    alphabet/

    objects/

    backgrounds/

    rewards/

    feedback/

    shapes/

  audio/
```

---

# 15. ESTRUTURA DO CÓDIGO

Utilizar aproximadamente:

```text
src/

  components/

  screens/

  navigation/

  contexts/

  hooks/

  services/

  database/

  data/

  utils/

  constants/
```

Evitar arquivos gigantes.

Criar componentes reutilizáveis.

---

# 16. COMPONENTES

Criar componentes reutilizáveis quando fizer sentido.

Exemplos:

```text
PrimaryButton.js

AlfiMessage.js

LetterCard.js

SyllableCard.js

WordCard.js

ActivityCard.js

ProgressCard.js

RewardModal.js

Loading.js
```

---

# 17. COMPONENTES NATIVOS

Demonstrar componentes React Native como:

```javascript
View
Text
Image
Pressable
ScrollView
FlatList
TextInput
Modal
Switch
ActivityIndicator
```

Não substituir tudo por bibliotecas externas.

É importante demonstrar conhecimento dos componentes nativos.

---

# 18. TELAS

Criar inicialmente:

```text
SplashScreen.js

HomeScreen.js

LearnScreen.js

LettersScreen.js

LetterActivityScreen.js

SyllablesScreen.js

SyllableActivityScreen.js

WordsScreen.js

WordActivityScreen.js

GamesScreen.js

ProgressScreen.js

SettingsScreen.js

DeviceInfoScreen.js

NearbyResourcesScreen.js

AboutScreen.js
```

---

# 19. TAB NAVIGATION

Criar menu inferior:

**Início**

**Aprender**

**Progresso**

**Configurações**

Utilizar Tab Navigation.

---

# 20. STACK NAVIGATION

Utilizar Stack Navigation para navegação entre atividades.

Exemplo:

```text
Splash

MainTabs

Letters

LetterActivity

Syllables

SyllableActivity

Words

WordActivity

Result

DeviceInfo

NearbyResources

About
```

---

# 21. HOME

A Home deverá apresentar:

Logo Alfatea.

Alfi.

Texto:

**“Olá! Vamos aprender?”**

Botão:

**COMEÇAR**

Mostrar também algum indicador simples de progresso.

---

# 22. APRENDER

Categorias principais:

## Letras

## Sílabas

## Palavras

## Jogos

Utilizar cards grandes.

---

# 23. LETRAS

Trabalhar de:

A até Z.

Cada letra poderá apresentar:

- letra;
- áudio;
- imagem;
- palavra exemplo.

Exemplo:

# A

**ABELHA**

[imagem da abelha]

Botão de áudio para ouvir.

---

# 24. ALFABETO

Assets:

```text
letra_a.png
letra_b.png
letra_c.png
...
letra_z.png
```

Não criar uma única imagem contendo todas as letras para utilização nas atividades.

---

# 25. SÍLABAS

Começar com:

```text
BA
BE
BI
BO
BU
```

Depois:

```text
CA
CE
CI
CO
CU
```

e continuar progressivamente.

Relacionar:

**som + sílaba + palavra + imagem**

---

# 26. PALAVRAS

Começar com palavras simples:

**CASA**

**BOLA**

**PATO**

**GATO**

**SOL**

**LUA**

Criar assets:

```text
casa.png
bola.png
pato.png
gato.png
sol.png
lua.png
estrela.png
arvore.png
```

---

# 27. ATIVIDADE IMAGEM → PALAVRA

Exemplo:

Mostrar imagem de gato.

Perguntar:

**“Qual é esta palavra?”**

Opções:

GATO

PATO

CASA

---

# 28. PALAVRA → IMAGEM

Mostrar:

# BOLA

Apresentar algumas imagens.

A criança seleciona a imagem correspondente.

---

# 29. COMPLETAR PALAVRA

Exemplo:

```text
C _ S A
```

Opções:

A

E

O

Resposta:

CASA.

---

# 30. ORGANIZAR SÍLABAS

Exemplo:

```text
CA
SA
```

Formar:

**CASA**

---

# 31. IDENTIFICAR LETRAS

Exemplo:

**“Encontre a letra A.”**

Mostrar poucas alternativas.

Não sobrecarregar a tela.

---

# 32. FEEDBACK

Quando acertar:

mostrar Alfi comemorando.

Mensagem:

**Muito bem!**

Utilizar:

- animação suave;
- som opcional;
- haptic/vibração suave;
- estrela.

Quando errar:

mostrar:

**Vamos tentar novamente?**

Não criar tela de derrota.

---

# 33. VIBRAÇÃO / HAPTICS

Utilizar feedback tátil.

Acerto:

feedback positivo suave.

Erro:

feedback muito discreto.

Permitir desativar nas configurações.

---

# 34. USESTATE

Demonstrar `useState`.

Utilizar em situações reais:

- resposta selecionada;
- pontuação;
- modal;
- loading;
- configurações;
- atividade atual;
- alternativa;
- estado da tela.

---

# 35. USEEFFECT

Demonstrar `useEffect`.

Utilizar para:

- carregar progresso;
- consultar SQLite;
- carregar configurações;
- consultar API;
- inicializar dados;
- verificar recursos quando necessário.

---

# 36. CONTEXT API

Criar Context API para estado global.

Sugestão:

```text
AppContext.js
```

ou:

```text
ProgressContext.js
SettingsContext.js
```

Armazenar globalmente quando apropriado:

- progresso;
- estrelas;
- perfil;
- configurações;
- som;
- vibração.

Não utilizar Context para estados puramente locais.

---

# 37. ASYNCSTORAGE

Utilizar AsyncStorage para:

- configurações;
- primeira abertura;
- nome/apelido;
- som;
- vibração;
- notificações;
- preferências.

---

# 38. SQLITE

SQLite deverá ser utilizado para progresso.

Criar banco local.

Possíveis tabelas:

```text
users

activities

progress

attempts
```

Registrar:

- atividade;
- módulo;
- acertos;
- erros/tentativas;
- data;
- conclusão.

Fechar o aplicativo e abrir novamente não pode apagar o progresso.

---

# 39. PROGRESSO

Criar tela:

# Meu Progresso

Mostrar:

- letras aprendidas;
- sílabas concluídas;
- palavras;
- atividades realizadas;
- estrelas;
- porcentagem aproximada do módulo.

Não criar ranking entre crianças.

---

# 40. RECOMPENSAS

Utilizar:

- estrelas;
- medalhas;
- troféus.

Assets:

```text
estrela.png

medalha_bronze.png

medalha_prata.png

medalha_ouro.png

trofeu.png
```

---

# 41. NOTIFICAÇÕES

Implementar notificações usando solução compatível com Expo.

Nas configurações:

**Lembrete de aprendizagem**

Exemplo:

**“Que tal aprender um pouco com o Alfi hoje?”**

Permitir:

ativar/desativar.

Não enviar notificações excessivas.

---

# 42. INFORMAÇÕES DO DISPOSITIVO

Criar:

Configurações

→ Informações do dispositivo

Mostrar, quando disponível:

- sistema operacional;
- versão;
- tipo de dispositivo;
- fabricante/marca;
- modelo;
- versão do aplicativo.

Utilizar APIs compatíveis com Expo.

---

# 43. GEOLOCALIZAÇÃO

Criar:

**Recursos próximos**

A localização NÃO deve ser essencial para o funcionamento do Alfatea.

Solicitar permissão apenas quando o usuário entrar nessa funcionalidade.

Nunca solicitar localização imediatamente na abertura do aplicativo.

Se o usuário recusar:

o restante do Alfatea continua funcionando normalmente.

Não rastrear localização em segundo plano.

---

# 44. API

Implementar comunicação com pelo menos uma API pública ou backend.

A funcionalidade precisa demonstrar:

- requisição;
- loading;
- sucesso;
- erro;
- ausência de internet.

Não tornar as atividades principais dependentes da internet.

---

# 45. LINKING

Criar tela:

# Sobre o Alfatea

Adicionar recurso externo relevante.

Utilizar:

```javascript
Linking
```

para abrir endereço externo.

---

# 46. ÁUDIO

Criar:

```text
assets/audio/
```

Planejar:

- letras;
- sílabas;
- palavras;
- feedback.

Permitir:

**Som ligado/desligado.**

---

# 47. CONFIGURAÇÕES

Criar opções:

**Som**

ON/OFF

**Vibração**

ON/OFF

**Notificações**

ON/OFF

**Informações do dispositivo**

**Recursos próximos**

**Sobre o Alfatea**

---

# 48. ACESSIBILIDADE

Priorizar:

- botões grandes;
- textos legíveis;
- alto contraste;
- poucos elementos simultâneos;
- uma atividade principal por tela;
- instruções curtas;
- animações suaves;
- repetição de áudio;
- navegação previsível.

Evitar:

- elementos piscando;
- excesso de animações;
- música alta;
- sons inesperados;
- cronômetros;
- punições;
- excesso de informações.

---

# 49. INSTALADOR

Preparar projeto para build.

Prioridade:

# ANDROID

Gerar instalador Android para apresentação acadêmica.

Utilizar ferramentas adequadas do Expo/EAS.

O projeto não deve ser considerado finalizado somente porque funciona no Expo Go.

Preparar estrutura compatível também com iOS quando possível.

---

# 50. PRIVACIDADE

Como o aplicativo é direcionado a crianças:

minimizar coleta de informações.

Não armazenar dados pessoais desnecessários.

Não armazenar localização precisa permanentemente.

Não rastrear a criança.

---

# 51. MVP

A primeira versão deverá permitir:

1. abrir Alfatea;
2. Splash;
3. Home;
4. visualizar Alfi;
5. navegar pelas Tabs;
6. abrir módulo Letras;
7. realizar atividade;
8. receber feedback;
9. utilizar vibração;
10. salvar progresso;
11. fechar aplicativo;
12. abrir novamente;
13. recuperar progresso;
14. acessar configurações;
15. demonstrar informações do dispositivo;
16. demonstrar localização;
17. demonstrar API;
18. demonstrar notificações.

Depois expandir Sílabas, Palavras e Jogos.

---

# 52. ORDEM DE IMPLEMENTAÇÃO

Não tente desenvolver tudo simultaneamente.

FASE 1:

Estrutura Expo + navegação + tema.

FASE 2:

Splash + Home + Tabs.

FASE 3:

Letras + primeira atividade.

FASE 4:

Context API + AsyncStorage.

FASE 5:

SQLite + progresso.

FASE 6:

Sílabas e palavras.

FASE 7:

Notificações + vibração.

FASE 8:

Device Info.

FASE 9:

Geolocalização.

FASE 10:

API + Linking.

FASE 11:

testes.

FASE 12:

build Android.

---

# 53. REGRA SOBRE AS IMAGENS

As referências visuais do Alfatea e Alfi já foram aprovadas.

As imagens devem ser inseridas individualmente em `assets`.

Não utilizar uma prancha contendo vários elementos como um único asset dentro do aplicativo.

Caso algum asset ainda não esteja disponível, criar temporariamente um placeholder claramente identificado, sem mudar a identidade visual definida.

Não inventar caminhos para arquivos que não existem.

---

# 54. REGRAS PARA O CODEX

Antes de programar:

1. leia todo este documento;
2. analise a pasta atual do projeto;
3. informe o que já existe;
4. verifique `package.json`;
5. identifique a versão do Expo;
6. verifique dependências existentes;
7. verifique erros atuais;
8. não apague código funcional sem necessidade.

Se o projeto ainda não existir, criar corretamente um projeto:

**React Native + Expo + JavaScript**

NÃO utilizar template TypeScript.

---

# 55. INSTALAÇÃO DE PACOTES

Antes de instalar dependências, verificar compatibilidade com a versão atual do Expo.

Dar preferência às versões compatíveis recomendadas pelo Expo.

Não instalar pacotes aleatoriamente.

---

# 56. QUALIDADE DO CÓDIGO

Código deve ser:

- organizado;
- simples;
- comentado quando necessário;
- compreensível;
- reutilizável;
- adequado a um projeto acadêmico.

Não criar arquitetura exageradamente complexa.

A professora precisa conseguir identificar os conceitos estudados no código.

---

# 57. REGRA ABSOLUTA

O Alfatea utiliza:

# JAVASCRIPT + REACT NATIVE + EXPO

NÃO utilizar TypeScript.

NÃO utilizar Kotlin.

NÃO utilizar Jetpack Compose.

---

# 58. OBJETIVO FINAL

Entregar um aplicativo funcional e instalável que demonstre os conteúdos estudados na disciplina e apresente uma proposta real de apoio à alfabetização.

Priorizar:

**aprendizagem > gamificação**

**simplicidade > complexidade**

**acessibilidade > excesso de efeitos**

**qualidade > quantidade**

---

# PRIMEIRA TAREFA

Agora analise o projeto existente antes de modificar qualquer arquivo.

Depois me informe:

1. estrutura atual;
2. versão do Expo;
3. dependências instaladas;
4. telas existentes;
5. assets existentes;
6. problemas encontrados;
7. o que falta para atender este documento.

Somente depois dessa análise, comece a implementação incremental do Alfatea.

Não migre para TypeScript.