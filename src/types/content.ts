import type { Picture } from "vite-imagetools";

/**
 * Campos obrigatórios de propósito: um dado sem fonte ou uma imagem sem
 * crédito não compila.
 */

/** Data no formato AAAA-MM-DD, AAAA-MM ou AAAA. */
export type DataISO =
  `${number}-${number}-${number}` | `${number}-${number}` | `${number}`;

/** Estatuto da fonte. União fechada: não adicione valores sem ADR. */
export type EstatutoFonte =
  | "tecnica-academica"
  | "institucional"
  | "movimento-social"
  | "midia-independente"
  | "imprensa"
  | "fonte-humana";

interface FonteBase {
  /** Identificador estável, o mesmo registrado em docs/fontes.md. */
  id: string;
  titulo: string;
  autorOuOrgao: string;
  dataPublicacao: DataISO;
  dataAcesso: DataISO;
}

export interface FonteDocumental extends FonteBase {
  estatuto: Exclude<EstatutoFonte, "fonte-humana">;
  url: string;
}

/** Entrevista feita pela equipe: não tem URL. */
export interface FonteHumana extends FonteBase {
  estatuto: "fonte-humana";
  url: null;
}

export type Fonte = FonteDocumental | FonteHumana;

export interface Dado {
  valor: number;
  unidade: string;
  anoReferencia: number;
  /** Recorte territorial e/ou temporal do dado. */
  recorte: string;
  /** Id de uma Fonte registrada em docs/fontes.md e em src/content. */
  fonteId: string;
}

export interface Imagem {
  /** Import com `?responsiva`: variantes, largura e altura reais saem da build (ADR-016). */
  arquivo: Picture;
  alt: string;
  credito: string;
  licenca: string;
  acervo: string;
}

/** Marcador de conteúdo que ainda não chegou. Entra no aviso do check-conteudo. */
export interface Pendente {
  readonly tipo: "pendente";
  /** O que falta e quem deve fornecer. */
  readonly descricao: string;
}

export type OuPendente<T> = T | Pendente;

/**
 * Conteúdo copiado do protótipo do Figma que ainda não foi confirmado pelo
 * Jornalismo. Aparece marcado na tela e, como `Pendente`, entra no aviso do
 * check-conteudo (ADR-019).
 */
export interface Provisorio<T = TextoRico> {
  readonly tipo: "provisorio";
  readonly conteudo: T;
  /** Por que não está confirmado e quem deve confirmar. */
  readonly motivo: string;
}

export interface TrechoFormatado {
  readonly texto: string;
  readonly negrito?: boolean;
  readonly sublinhado?: boolean;
}

export type Trecho = string | TrechoFormatado;

/** Texto corrido com trechos em negrito ou sublinhados, como no protótipo. */
export type TextoRico = string | readonly Trecho[];

export type Texto = TextoRico | Provisorio;
