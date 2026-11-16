/*
 * DADOS FICTÍCIOS. NÃO PUBLICAR.
 *
 * Tudo neste arquivo foi inventado para testar o protótipo do mapa, na branch
 * prototipo/mapa-mock, que nunca vai para a main. Só são reais os nomes dos
 * prédios (escolhidos pela equipe) e as coordenadas, que dizem a origem e se
 * são aproximadas. Situação, anos, usos, tombamento, proprietário, PEUC e
 * memória são ficção e não podem ser citados, copiados para src/content/ nem
 * aparecer num print fora do aviso "DADOS FICTÍCIOS — PROTÓTIPO".
 */
import type { Predio } from "../types/mapa";

const OSM = "OpenStreetMap (Nominatim), consulta de 2026-11-16";

export const prediosMock: readonly Predio[] = [
  {
    id: "teatro-valdemar-de-oliveira",
    nome: "Teatro Valdemar de Oliveira",
    coordenada: {
      latitude: -8.05513,
      longitude: -34.89159,
      coordenadaAproximada: true,
      origem: `${OSM}: centro da Praça Oswaldo Cruz, não o lote do teatro`,
    },
    situacao: "abandonado",
    bairro: "Soledade",
    anoConstrucao: 1968,
    usoOriginal: "Teatro",
    usoAtual: "Sem uso",
    anosSemUso: 6,
    tombamento: { tombado: true, orgao: "Fundarpe" },
    tipoProprietario: "privado",
    notificacaoPeuc: null,
    memoria:
      "Texto fictício. Sala de espetáculos com plateia em declive e um foyer que recebia leituras e ensaios abertos ao público do bairro.",
    anoReferencia: 2026,
    fonteIds: [],
  },
  {
    id: "igreja-sao-jose-do-ribamar",
    nome: "Igreja de São José do Ribamar",
    coordenada: {
      latitude: -8.07086,
      longitude: -34.8793,
      coordenadaAproximada: false,
      origem: `${OSM}: Rua Coração de Maria, 117`,
    },
    situacao: "a_confirmar",
    bairro: "São José",
    anoConstrucao: 1790,
    usoOriginal: "Templo religioso",
    usoAtual: "Templo religioso, com uso reduzido",
    anosSemUso: null,
    tombamento: { tombado: true, orgao: "IPHAN" },
    tipoProprietario: "privado",
    notificacaoPeuc: null,
    memoria:
      "Texto fictício. Igreja de irmandade, com nave única e torre lateral, ponto de partida de procissões que atravessavam as ruas do bairro.",
    anoReferencia: 2026,
    fonteIds: [],
  },
  {
    id: "casarao-da-varzea",
    nome: "Casarão da Várzea",
    coordenada: {
      latitude: -8.04977,
      longitude: -34.95905,
      coordenadaAproximada: false,
      origem: `${OSM}: Rua Azeredo Coutinho, 130 (antigo Hospital Magitot, IEP 157)`,
    },
    situacao: "reversao",
    bairro: "Várzea",
    anoConstrucao: 1905,
    usoOriginal: "Residência",
    usoAtual: "Em obra",
    anosSemUso: 11,
    tombamento: { tombado: true, orgao: "Prefeitura (IEP)" },
    tipoProprietario: "publico",
    notificacaoPeuc: null,
    memoria:
      "Texto fictício. Casa de sítio com varandas largas e jardim na frente, depois adaptada para atendimento de saúde.",
    anoReferencia: 2026,
    fonteIds: [],
  },
  {
    id: "cine-art-palacio",
    nome: "Cine Art-Palácio",
    coordenada: {
      latitude: -8.06337,
      longitude: -34.88013,
      coordenadaAproximada: true,
      origem: `${OSM}: trecho da Rua da Palma, não o lote do cinema`,
    },
    situacao: "abandonado",
    bairro: "Santo Antônio",
    anoConstrucao: 1940,
    usoOriginal: "Cinema",
    usoAtual: "Sem uso",
    anosSemUso: 30,
    tombamento: { tombado: false },
    tipoProprietario: "publico",
    notificacaoPeuc: { obrigacao: "utilizar", dataNotificacao: "2024-06" },
    memoria:
      "Texto fictício. Sala grande de cinema de rua, com letreiro luminoso na fachada e sessões contínuas nas tardes de domingo.",
    anoReferencia: 2026,
    fonteIds: [],
  },
  {
    id: "cinema-sao-luiz",
    nome: "Cinema São Luiz",
    coordenada: {
      latitude: -8.06209,
      longitude: -34.88205,
      coordenadaAproximada: false,
      origem: `${OSM}: Rua da Aurora, 175`,
    },
    situacao: "reversao",
    bairro: "Boa Vista",
    anoConstrucao: 1952,
    usoOriginal: "Cinema",
    usoAtual: "Cinema",
    anosSemUso: null,
    tombamento: { tombado: true, orgao: "Fundarpe" },
    tipoProprietario: "publico",
    notificacaoPeuc: null,
    memoria:
      "Texto fictício. Cinema de rua à beira do rio, com vitrais no saguão e uma sala que lotava nas estreias.",
    anoReferencia: 2026,
    fonteIds: [],
  },
  {
    id: "edificio-jk",
    nome: "Edifício JK",
    coordenada: {
      latitude: -8.06305,
      longitude: -34.87815,
      coordenadaAproximada: false,
      origem: `${OSM}: Avenida Dantas Barreto, 315`,
    },
    situacao: "a_confirmar",
    bairro: "Santo Antônio",
    anoConstrucao: 1958,
    usoOriginal: "Salas comerciais e residências",
    usoAtual: "Parcialmente ocupado",
    anosSemUso: 4,
    tombamento: { tombado: false },
    tipoProprietario: "privado",
    notificacaoPeuc: { obrigacao: "utilizar", dataNotificacao: "2024-03" },
    memoria:
      "Texto fictício. Prédio de escritórios com galeria no térreo, onde funcionavam lojas, um café e uma barbearia.",
    anoReferencia: 2026,
    fonteIds: [],
  },
];
