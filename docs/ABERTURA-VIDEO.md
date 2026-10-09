# Abertura em vídeo

A rota inicial exibe `src/screens/TelaAbertura.js`, reproduz o vídeo local e
substitui a rota por `/home` ao terminar ou ao tocar em **Pular abertura**.
Se ocorrer erro de reprodução, também segue para a tela inicial.

Arquivo: `assets/videos/abertura.mp4` (516.933 bytes, aproximadamente 0,52 MB).
Original: 1.903.760 bytes; redução aproximada de 73%.
Duração: aproximadamente 10 segundos. H.264, 414 × 720, áudio AAC 64 kb/s.
As faixas pretas laterais do original foram removidas sem cortar o personagem.
O arquivo original em Downloads foi preservado.

A reprodução respeita a preferência de som e pausa quando o app perde atividade.
Na web, inicia sem som para permitir reprodução automática e oferece **Ativar som**.
O vídeo está incluído no aplicativo, sem depender de internet.

Validar no aparelho: reprodução até o fim, pular, som desligado e minimizar/retomar.
Para builds próprios, gerar um novo build após adicionar o módulo `expo-video`.
