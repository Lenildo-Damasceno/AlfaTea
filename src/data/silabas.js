import { ALFABETO } from "./alphabet";

// Separação escrita das palavras do alfabeto, na mesma ordem de A a Z.
const SEPARACOES = [
  ["A", "BE", "LHA"],
  ["BO", "LA"],
  ["CA", "SA"],
  ["DA", "DO"],
  ["ES", "TRE", "LA"],
  ["FA", "CA"],
  ["GA", "TO"],
  ["HE", "LI", "CÓP", "TE", "RO"],
  ["I", "LHA"],
  ["JA", "CA", "RÉ"],
  ["KI", "WI"],
  ["LU", "A"],
  ["MA", "LA"],
  ["NA", "VI", "O"],
  ["O", "VO"],
  ["PA", "TO"],
  ["QUEI", "JO"],
  ["RA", "TO"],
  ["SA", "PO"],
  ["TO", "MA", "TE"],
  ["U", "VA"],
  ["VA", "CA"],
  ["WIL", "LI", "AM"],
  ["XÍ", "CA", "RA"],
  ["YAS", "MIN"],
  ["ZE", "BRA"],
];

export const PALAVRAS_SILABAS = ALFABETO.map((item, indice) => ({
  ...item,
  silabas: SEPARACOES[indice],
}));
