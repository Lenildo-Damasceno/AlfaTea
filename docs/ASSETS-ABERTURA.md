# Assets da abertura

Gerados com a ferramenta integrada image_gen, usando a prancha enviada pelo usuário como referência visual. São recriações baseadas na referência, não recortes dos arquivos originais.

- assets/images/branding/icone_alfatea.png: ícone quadrado, Alfi azul com detalhes verdes e olhos castanhos, fundo azul, sem texto.
- assets/images/alfi/alfi_ola.png: personagem inteiro acenando, mochila azul e amarela, transparência, sem cenário ou texto.
- assets/images/branding/logo_alfatea.png: palavra exata Alfatea, letras arredondadas coloridas seguindo a referência, transparência, sem slogan. Slogan renderizado como texto nativo acessível.

Prompts utilizados (especificação):
1. Single square full-bleed mobile app icon for Alfatea. Match approved board: rounded glossy blue baby dinosaur, green dorsal spikes, pale green belly, brown eyes, joyful smile. Center head and upper torso, blue/cyan background, no text or pre-rounded corners.
2. Single isolated full-body Alfi waving hello, transparent PNG. Match board and icon. Rounded glossy blue dinosaur, green spikes, pale green belly, brown eyes, white claws, blue backpack with yellow straps. Whole body and tail, no text or scenery.
3. Single isolated horizontal wordmark Alfatea, transparent PNG. Match board: rounded playful soft 3D letters, Alf blue, a cyan, t green, e yellow, final a soft red, small celebratory strokes. No slogan or character.

A abertura React Native contém logo, slogan, personagem e botão para entrar, sem temporizador obrigatório. A abertura nativa usa o Alfi sobre o fundo oficial; o logo completo aparece ao carregar a interface. O botão substitui a rota de abertura para não retornar a ela ao pressionar Voltar.

Validar ícone e splash nativa em build instalado. Expo Go não representa essas configurações finais. Assets mantidos separados; a prancha inteira não é utilizada na interface.
