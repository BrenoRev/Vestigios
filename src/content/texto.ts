import type { TrechoFormatado } from "../types/content";

export function negrito(texto: string): TrechoFormatado {
  return { texto, negrito: true };
}

export function sublinhado(texto: string): TrechoFormatado {
  return { texto, sublinhado: true };
}

export function negritoSublinhado(texto: string): TrechoFormatado {
  return { texto, negrito: true, sublinhado: true };
}
