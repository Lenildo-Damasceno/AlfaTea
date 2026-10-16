import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { ALFABETO } from "../src/data/alphabet.js";
import { NOMES_LETRAS } from "../src/data/nomesLetras.js";

const pasta = new URL("../assets/audio/", import.meta.url);
mkdirSync(pasta, { recursive: true });
const gravacoes = ALFABETO.map((item) => ({ id: `letra-${item.letra.toLowerCase()}`, texto: NOMES_LETRAS[item.letra], revisado: false }));
for (const item of ALFABETO.filter((item) => "AEIOU".includes(item.letra))) {
  gravacoes.push({ id: `exemplo-${item.letra.toLowerCase()}`, texto: `${NOMES_LETRAS[item.letra]} de ${item.palavra.toLowerCase()}`, revisado: false });
  gravacoes.push({ id: `palavra-${item.letra.toLowerCase()}`, texto: item.palavra.toLowerCase(), revisado: false });
}
const manifesto = new URL("catalog.json", pasta);
if (!existsSync(manifesto)) writeFileSync(manifesto, JSON.stringify({ voz: "Microsoft Maria Desktop", idioma: "pt-BR", formato: "PCM WAV mono 24kHz 16bit", gravacoes }, null, 2) + "\n");
writeFileSync(new URL("../src/data/audioSources.js", import.meta.url), "// Referências estáticas exigidas pelo Metro. A revisão é controlada em assets/audio/catalog.json.\nexport const FONTES_AUDIO = {\n" + gravacoes.map((item) => `  ${JSON.stringify(item.id)}: require("../../assets/audio/${item.id}.wav"),`).join("\n") + "\n};\n");
