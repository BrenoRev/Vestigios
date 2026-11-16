import type { DataISO } from "./content";

/**
 * Contrato do "Mapa dos Dados". Os mesmos nomes do componente Marcador de
 * prédio no Figma (`2:1084`), para a troca do mock pelos dados reais não
 * mexer na interface.
 */
export type SituacaoPredio = "abandonado" | "reversao" | "a_confirmar";

export interface Coordenada {
  latitude: number;
  longitude: number;
  /** true enquanto o ponto for o centro da rua ou da praça, não o lote. */
  coordenadaAproximada: boolean;
  /** De onde veio o ponto (geocodificação, levantamento, cadastro). */
  origem: string;
}

/**
 * IEP: Imóvel Especial de Preservação, a proteção municipal (Lei 16.284/1997
 * e decretos), listada no dataset de IEPs da Prefeitura.
 */
export type OrgaoPreservacao = "IPHAN" | "Fundarpe" | "Prefeitura (IEP)";

export type Tombamento =
  { tombado: false } | { tombado: true; orgao: OrgaoPreservacao };

/** Nunca o nome do proprietário: regra editorial 3. */
export type TipoProprietario = "publico" | "privado";

/** Planilha de notificações do PEUC (ICPS, Prefeitura do Recife). */
export interface NotificacaoPeuc {
  obrigacao: "utilizar" | "edificar";
  dataNotificacao: DataISO;
}

export interface Predio {
  id: string;
  nome: string;
  coordenada: Coordenada;
  situacao: SituacaoPredio;
  bairro: string;
  anoConstrucao: number;
  usoOriginal: string;
  usoAtual: string;
  /** null quando o prédio está em uso. */
  anosSemUso: number | null;
  tombamento: Tombamento;
  tipoProprietario: TipoProprietario;
  /** null quando o imóvel não consta da planilha do PEUC. */
  notificacaoPeuc: NotificacaoPeuc | null;
  /** O que o prédio era: parágrafo curto. */
  memoria: string;
  /** Ano a que os atributos se referem (regra editorial 5). */
  anoReferencia: number;
  /** Ids registrados em docs/fontes.md que sustentam os atributos. */
  fonteIds: readonly string[];
}

export type NomeEnquadramento = "recife" | "centro";

/** Transformação do viewBox: ponto na tela = ponto × escala + (x, y). */
export interface Enquadramento {
  escala: number;
  x: number;
  y: number;
}

/** Saída de scripts/gerar-mapa-prototipo.mjs, em unidades do viewBox. */
export interface BaseMapa {
  lado: number;
  bairros: readonly { nome: string; d: string }[];
  /** Corpos d'água de 2 ha ou mais, inclusive o mar. */
  agua: readonly string[];
  pontos: Readonly<Record<string, { x: number; y: number }>>;
  enquadramentos: Readonly<Record<NomeEnquadramento, Enquadramento>>;
}

/** Rótulos de interface do mapa; o conteúdo dos prédios vem em `Predio`. */
export interface TextosMapa {
  aviso: string;
  titulo: string;
  introducao: string;
  rotuloMapa: string;
  rotuloFiltros: string;
  todos: string;
  rotuloEnquadramentos: string;
  enquadramentos: Readonly<Record<NomeEnquadramento, string>>;
  situacoes: Readonly<Record<SituacaoPredio, string>>;
  rotuloAbas: string;
  fichaVazia: string;
  coordenadaAproximada: string;
  campos: {
    situacao: string;
    bairro: string;
    anoConstrucao: string;
    usoOriginal: string;
    usoAtual: string;
    anosSemUso: string;
    tombamento: string;
    proprietario: string;
    peuc: string;
    memoria: string;
  };
  valores: {
    emUso: string;
    naoTombado: string;
    tombadoPor: string;
    proprietario: Readonly<Record<TipoProprietario, string>>;
    semPeuc: string;
    peuc: Readonly<Record<NotificacaoPeuc["obrigacao"], string>>;
    anoReferencia: string;
  };
  tabela: {
    legenda: string;
    vazia: string;
    predio: string;
  };
}
