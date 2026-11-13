import type {
  Imagem,
  OuPendente,
  Pendente,
  Provisorio,
  Texto,
} from "./content";

export interface ItemNavegacao {
  rotulo: string;
  /** Id da seção de destino. */
  alvo: string;
}

export interface ConteudoHero {
  fundo: OuPendente<Imagem>;
  afirmacao: Texto;
  separador: string;
  convite: Texto;
  botao: ItemNavegacao;
}

export interface ConteudoPrimeiraMateria {
  alvo: string;
  rotulo: string;
  titulo: Texto;
  blocos: readonly { subtitulo: Texto; texto: Texto }[];
  citacao: { texto: Texto; autor: Texto };
}

export type Estrofes = readonly (readonly string[])[];

export interface ConteudoQuebra {
  estrofes: Estrofes | Provisorio<Estrofes>;
}

export interface Cabecalho {
  titulo: Texto;
  paragrafos: readonly Texto[];
}

export interface Conceito {
  titulo: Texto;
  texto: Texto;
}

export interface Estatistica {
  numero: Texto;
  unidade?: string;
  legenda: Texto;
}

export interface Etapa {
  titulo: string;
  paragrafos: readonly Texto[];
}

export interface Instituicao {
  esfera: Texto;
  nome: string;
  logo: Pendente;
}

export interface Destaque {
  titulo: Texto;
  texto: Texto;
  icone: Pendente;
}

export interface ConteudoGuia {
  alvo: string;
  rotulo: string;
  titulo: string;
  introducao: string;
  prediosHistoricos: {
    cabecalho: Cabecalho;
    imagem: Pendente;
    conceitos: readonly Conceito[];
  };
  deterioracao: {
    cabecalho: Cabecalho;
    sentidos: readonly (Conceito & { icone: Pendente })[];
  };
  tombamento: {
    cabecalho: Cabecalho;
    mudancas: {
      titulo: Texto;
      efeitos: readonly (Conceito & { icone: Pendente })[];
    };
    funcionamento: {
      titulo: Texto;
      introducao: Texto;
      etapas: readonly Etapa[];
    };
    destaque: Destaque;
  };
  protecao: {
    cabecalho: Cabecalho;
    instituicoes: readonly Instituicao[];
    iep: Texto;
    obrigacao: Texto;
    imagem: Pendente;
    impasse: Texto;
  };
  duracao: {
    cabecalho: Cabecalho;
    estatisticas: readonly Estatistica[];
    pendencia: Pendente;
  };
  panorama: {
    cabecalho: Cabecalho;
    protegidos: {
      titulo: string;
      estatisticas: readonly Estatistica[];
      observacao: Texto;
    };
    foraDaConta: {
      titulo: string;
      observacao: Texto;
      estatisticas: readonly Estatistica[];
      pendencia: Pendente;
    };
    custo: {
      titulo: string;
      imagem: Pendente;
      texto: Texto;
      pendencia: Pendente;
    };
  };
}
