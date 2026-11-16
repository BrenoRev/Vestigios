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
    "Protótipo de interação. Os prédios são reais; situação, datas, usos e textos são inventados para teste.",
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
};
