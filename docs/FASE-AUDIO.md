# Fase de áudio educativo

Status: planejada, ainda não implementada. Registrada em 06/10/2026.

Implementar junto à expansão de sílabas e palavras, antes dos testes finais em dispositivo. Manter JavaScript + React Native + Expo.

## Objetivo e solução

Usar arquivos MP3 locais para pronúncias e mensagens de incentivo, reproduzidos com `expo-audio`. O pacote reproduz áudio; não cria vozes ou arquivos. Instalar com `npx expo install expo-audio`, verificando a versão do Expo e a compatibilidade no momento da implementação.

Os áudios serão gravados por uma pessoa ou produzidos com ferramenta de geração de voz, sempre revisados antes de entrar nas atividades. Manter voz, volume e velocidade consistentes. As atividades devem funcionar sem internet.

## Organização prevista

```text
assets/audio/
  letras/a.mp3
  letras/b.mp3
  silabas/ba.mp3
  silabas/be.mp3
  palavras/casa.mp3
  palavras/bola.mp3
  feedback/muito_bem.mp3
  feedback/tente_novamente.mp3
```

Esses caminhos são exemplos planejados, não arquivos existentes. Só adicionar referências no código após os arquivos estarem disponíveis.

## Primeira entrega

- Vogais e primeiras sílabas.
- Palavras: CASA, BOLA, PATO, GATO, SOL e LUA.
- Mensagens curtas de incentivo, como “Muito bem!” e “Vamos tentar novamente?”.
- Revisão pedagógica para distinguir o nome da letra do som que representa em cada atividade.

## Critérios de aceitação

- Botão “Ouvir” reproduz a pronúncia correspondente e permite repetir.
- Apenas um áudio toca por vez, inclusive após toques rápidos.
- Reprodução para ao sair da atividade ou colocar o app em segundo plano.
- Opção global “Som ligado/desligado”, persistida com AsyncStorage; desligar interrompe o áudio atual e impede novas reproduções.
- Sem música de fundo nesta primeira entrega, nem sons inesperados ao abrir telas.
- Reprodução não solicita acesso ao microfone; não haverá gravação dentro do aplicativo nesta fase.
- Testar offline, repetição, troca de telas, preferência após reabrir e comportamento no Android e iOS disponíveis.

Referência técnica: https://docs.expo.dev/versions/v57.0.0/sdk/audio/
