/**
 * Tipos mínimos do conteúdo editorial.
 *
 * Desenhados para que o erro apareça na compilação: um dado sem fonte
 * ou uma imagem sem crédito não compila. Tipos novos de conteúdo só
 * entram na Fase 3, a partir do protótipo, sob Stop & Ask (CLAUDE.md).
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

/** Fonte documental: sempre tem URL. */
export interface FonteDocumental extends FonteBase {
  estatuto: Exclude<EstatutoFonte, "fonte-humana">;
  url: string;
}

/** Fonte humana (entrevista): não tem URL. */
export interface FonteHumana extends FonteBase {
  estatuto: "fonte-humana";
  url: null;
}

export type Fonte = FonteDocumental | FonteHumana;

export interface Dado {
  valor: number;
  unidade: string;
  /** Ano a que o dado se refere. Obrigatório em toda cifra monetária. */
  anoReferencia: number;
  /** Recorte territorial e/ou temporal do dado. */
  recorte: string;
  /** Id de uma Fonte registrada em docs/fontes.md e em src/content. */
  fonteId: string;
}

export interface Imagem {
  src: string;
  alt: string;
  credito: string;
  licenca: string;
  acervo: string;
  /** Dimensões intrínsecas em px, obrigatórias para evitar layout shift. */
  largura: number;
  altura: number;
}

/** Marcador de conteúdo que ainda não chegou. Bloqueia a build de produção. */
export interface Pendente {
  readonly tipo: "pendente";
  /** O que falta e quem deve fornecer. */
  readonly descricao: string;
}

/** Use em src/content onde o conteúdo pode ainda estar pendente. */
export type OuPendente<T> = T | Pendente;
