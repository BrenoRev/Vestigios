import type { TextosMapa } from "../types/mapa";

/*
 * Rótulos de interface do protótipo do mapa. Não são dados, mas também não
 * foram confirmados pelo Jornalismo nem estão no Figma (exceto "Mapa dos
 * Dados", da Navbar, e as situações do Marcador de prédio).
 */
export const textosMapa: TextosMapa = {
  aviso: "DADOS FICTÍCIOS — PROTÓTIPO",
  titulo: "Mapa dos Dados",
  introducao:
    "Protótipo de interação. Os bairros e os prédios são reais; os indicadores, a situação, as datas, os usos e os textos são inventados para teste.",
  rotuloMapa: "Mapa do Recife com os prédios",
  rotuloFiltros: "Filtrar por situação",
  todos: "Todos",
  rotuloEnquadramentos: "Enquadramento do mapa",
  enquadramentos: { recife: "Recife", centro: "Centro" },
  situacoes: {
    abandonado: "Abandonado",
    reversao: "Reversão",
    a_confirmar: "A confirmar",
  },
  rotuloAbas: "Prédios",
  fichaVazia: "Escolha um prédio no mapa, nas abas ou na tabela.",
  coordenadaAproximada: "Localização aproximada",
  campos: {
    situacao: "Situação",
    bairro: "Bairro",
    anoConstrucao: "Construção",
    usoOriginal: "Uso original",
    usoAtual: "Uso atual",
    anosSemUso: "Anos sem uso",
    tombamento: "Tombamento",
    proprietario: "Proprietário",
    peuc: "PEUC",
    memoria: "O que o prédio era",
  },
  valores: {
    emUso: "Em uso",
    naoTombado: "Não tombado",
    tombadoPor: "Tombado por",
    proprietario: { publico: "Público", privado: "Privado" },
    semPeuc: "Não notificado",
    peuc: {
      utilizar: "Notificado para utilizar em",
      edificar: "Notificado para edificar em",
    },
    anoReferencia: "Dados de",
  },
  tabela: {
    legenda: "Os mesmos prédios do mapa, em tabela",
    vazia: "Nenhum prédio com as situações escolhidas.",
    predio: "Prédio",
  },
  indicadores: {
    taxaSemUso: {
      nome: "Imóveis sem uso por mil",
      unidade: "por mil imóveis",
      descricao: "Imóveis sem uso a cada mil imóveis do bairro.",
    },
    semUso: {
      nome: "Imóveis sem uso",
      unidade: "imóveis",
      descricao: "Total de imóveis sem uso no bairro.",
    },
    protegidos: {
      nome: "Imóveis protegidos",
      unidade: "imóveis",
      descricao: "Imóveis tombados ou classificados como IEP no bairro.",
    },
  },
  rotuloIndicadores: "Indicador",
  regraCodificacao:
    "Taxas aparecem como cor do bairro; totais, como círculos, para bairros grandes não parecerem piores só pelo tamanho.",
  rotuloAno: "Ano",
  tocar: "Reproduzir a série",
  pausar: "Pausar a série",
  zoom: {
    aproximar: "Aproximar",
    afastar: "Afastar",
    inicio: "Ver o Recife inteiro",
  },
  dicaRolagem: "Use Ctrl + rolagem para aproximar o mapa",
  dicaGestos:
    "Arraste para mover; use os botões, Ctrl + rolagem ou dois dedos para aproximar.",
  mostrarPredios: "Prédios",
  legendaPredios: "Situação dos prédios",
  legendaClasses: "Quartis de todos os anos e bairros",
  legendaCirculos: "Área do círculo proporcional ao total",
  bairrosNaClasse: "bairros",
  bairroVazio: "Clique num bairro ou num prédio para ver os dados.",
  limparSelecao: "Limpar seleção",
  fechar: "Fechar",
  posicao: "Posição",
  de: "de",
  medianaRecife: "Mediana dos bairros",
  serieTitulo: "Evolução no bairro",
  ranking: "Bairros com os maiores valores",
  tabelaBairros: {
    legenda: "Os mesmos bairros do mapa, em tabela",
    bairro: "Bairro",
  },
};
