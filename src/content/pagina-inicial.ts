import type {
  ConteudoGuia,
  ConteudoHero,
  ConteudoMateria,
  ConteudoQuebra,
  ItemNavegacao,
} from "../types/pagina-inicial";
import { pendente, provisorio } from "./pendente";
import { negrito, negritoSublinhado, sublinhado } from "./texto";

const INTENCAO =
  "afirma intenção como fato (regra editorial 2); Jornalismo reformula";

export const rotuloNavegacao = "Capítulos da reportagem";

export const navegacao: readonly ItemNavegacao[] = [
  { rotulo: "O Recife", alvo: "o-recife" },
  { rotulo: "Guia de Leitura", alvo: "guia-de-leitura" },
  { rotulo: "o Problema", alvo: "o-problema" },
  { rotulo: "mapa dos dados", alvo: "mapa-dos-dados" },
  { rotulo: "os responsáveis", alvo: "os-responsaveis" },
  { rotulo: "o futuro", alvo: "o-futuro" },
];

export const hero: ConteudoHero = {
  fundo: pendente(
    "foto de fundo do Hero, com crédito e licença; Design e Jornalismo",
  ),
  afirmacao: provisorio("O esvaziamento do Recife não é acidente", INTENCAO),
  separador: ": ",
  convite: provisorio(
    "Explore as memórias e os interesses por trás dos prédios vazios do Recife.",
    INTENCAO,
  ),
  botao: { rotulo: "Explorar o Mapa", alvo: "mapa-dos-dados" },
};

export const primeiraMateria: ConteudoMateria = {
  alvo: "o-recife",
  rotulo: "O Recife",
  titulo: "Recife: uma alma perdida em meio a destroços",
  blocos: [
    {
      subtitulo: "Uma cidade feita de memória",
      paragrafos: [
        "Recife, capital de Pernambuco conhecida como Veneza Brasileira. Cidade do frevo, dos rios e do mangue. Terra de Lenine, Nação Zumbi e Reginaldo Rossi. Local que abriga os mais bravos Leões do Norte. A cidade do Recife é marcada por uma história de luta, cultura e beleza, que carrega em seus prédios as memórias de cada pessoa que passou por ali.",
        "Nas últimas décadas, essa terra marcada por um encanto único passou a ser transformada em ruínas por um forte processo de deterioração. Prédios foram abandonados e destruídos, ruas ficaram mais vazias e a cidade, que antes era marcada por um movimento constante, perdeu sua chama, seu brilho e sua alma.",
      ],
    },
    {
      subtitulo: "O que esta reportagem mostra",
      paragrafos: [
        "Ao longo da reportagem, você encontrará informações sobre o processo de deterioração que acontece no Recife. Reunimos dados, entrevistas e histórias que ajudam a entender por que isso está acontecendo na cidade.",
        "Pelas memórias do Teatro Valdemar de Oliveira, analisamos a degradação sofrida por sua estrutura ao longo dos anos e como isso afeta a vida da população recifense. Também contamos a história de mais dois prédios, o Casarão da Várzea e a Igreja São José do Ribamar, que mostram que a deterioração não se limita a um único lugar: ela se espalha por toda a cidade.",
        "Por fim, apresentamos os órgãos responsáveis por uma possível revitalização e o futuro que se pode esperar para uma cidade que, um dia, foi considerada um organismo vivo e pulsante.",
      ],
    },
  ],
  citacao: {
    texto: "“Agora, o quadro é de total abandono e falta de interesse.”",
    autor: "Jorge de Souza, dramaturgo e roteirista",
  },
};

export const quebra: ConteudoQuebra = {
  estrofes: [
    [
      "Recife, por quanto tempo mais você estará entre nós,",
      "contando suas memórias e histórias?",
    ],
    [
      "O Recife guarda nas paredes o que o tempo já esqueceu,",
      "nos casarões de portas fechadas,",
      "os sonhos de quem já viveu.",
    ],
    ["A cidade cresce, se apaga,", "vende o passado, esquece o chão."],
    ["E o que resta da velha paisagem", "sobrevive na recordação."],
    ["Volte, Recife! Sua ausência me aperta o coração."],
    ["Quantas gerações ainda vão te perder? Quantos te deixaram na mão?"],
    [
      "Recife, não deixe que o tempo",
      "leve o que não pode voltar:",
      "uma cidade sem memória",
      "desaprendeu a se amar.",
    ],
  ],
};

const iconePendente = pendente("ícone do conceito, Design");

export const guia: ConteudoGuia = {
  alvo: "guia-de-leitura",
  rotulo: "Guia de Leitura",
  titulo: "Conceitos importantes para entender esta reportagem",
  introducao:
    "Antes de seguir com a leitura, vale parar em alguns conceitos que ajudam a entender tudo o que vem depois.",

  prediosHistoricos: {
    cabecalho: {
      titulo: ["O que são ", sublinhado("prédios históricos"), "?"],
      paragrafos: [
        [
          "São construções que guardam",
          negrito(" valor cultural, arquitetônico, social ou artístico"),
          " e ajudam a",
          negrito(" contar a história de uma cidade ou de um povo."),
        ],
      ],
    },
    imagem: pendente(
      "imagem do capítulo 1 (231 × 332 no Desktop), com crédito e licença; Design e Jornalismo",
    ),
    conceitos: [
      {
        titulo: "Memória e Identidade",
        texto:
          "Mostram como as pessoas viviam, trabalhavam e se relacionavam em cada época.",
      },
      {
        titulo: "Valor arquitetônico",
        texto:
          "Carregam estilos de época, como o colonial, o neoclássico, o barroco e o eclético, que ninguém reproduz mais",
      },
      {
        titulo: "Funções na cidade",
        texto:
          "Abrigam museus, bibliotecas, teatros e órgãos públicos, atraem visitantes e servem de fonte de estudo para historiadores, arquitetos e urbanistas.",
      },
    ],
  },

  deterioracao: {
    cabecalho: {
      titulo: ["O que é ", sublinhado("deterioração"), "?"],
      paragrafos: [
        [
          "Deterioração é o processo em que algo passa de um estado bom ou íntegro para um estado pior: sofre ",
          negrito("dano, desgaste ou perda de qualidade."),
        ],
        "Nesta reportagem, a palavra aparece em dois sentidos:",
      ],
    },
    sentidos: [
      {
        titulo: "Dano material ou físico",
        texto:
          "Desgaste, estrago ou apodrecimento de estruturas pelo uso ou pela ação do tempo, como infiltrações, rachaduras e telhados que cedem.",
        icone: iconePendente,
      },
      {
        titulo: "Declínio figurado",
        texto:
          "Estado de decadência de uma região, de uma instituição ou de uma sociedade, que perde vida, gente e função.",
        icone: iconePendente,
      },
    ],
  },

  tombamento: {
    cabecalho: {
      titulo: ["O que é um ", sublinhado("tombamento"), "?"],
      paragrafos: [
        [
          "É um ato administrativo do ",
          negrito("poder público"),
          " que reconhece e ",
          negrito("protege o valor histórico"),
          ", ",
          negrito("cultural, arquitetônico, ambiental ou artístico"),
          " de um bem, móvel ou imóvel.",
        ],
      ],
    },
    mudancas: {
      titulo: ["O que muda quando um imóvel é ", negrito("tombado?")],
      efeitos: [
        {
          titulo: ["Objetivo: mais ", sublinhado("proteção")],
          texto:
            "O tombamento impede a destruição, a demolição, a mutilação ou a descaracterização do bem, para que as próximas gerações também possam conhecê-lo.",
          icone: iconePendente,
        },
        {
          titulo: [sublinhado("Não"), " é desapropriação!"],
          texto: [
            "O Estado ",
            negrito("não toma posse"),
            " nem se torna dono do imóvel.",
          ],
          icone: iconePendente,
        },
        {
          titulo: ["A ", sublinhado("propriedade"), " continua a mesma"],
          texto: [
            negrito("O dono continua sendo o proprietário"),
            ", mas assume ",
            negrito("deveres de conservação"),
            " e limites de uso.",
          ],
          icone: iconePendente,
        },
        {
          titulo: [sublinhado("Sem autorização"), ", nada acontece"],
          texto:
            "Qualquer reforma, restauração, pintura ou modificação precisa de autorização prévia do órgão responsável.",
          icone: iconePendente,
        },
        {
          titulo: ["Existe ", sublinhado("indenização"), "?"],
          texto: [
            "Em regra, não há indenização, ",
            negrito("pois o proprietário não perde o bem."),
            " A exceção é quando existe prejuízo anormal e comprovado.",
          ],
          icone: iconePendente,
        },
      ],
    },
    funcionamento: {
      titulo: [negrito("Como funciona"), " o tombamento?"],
      introducao:
        "Na esfera federal, o Decreto-Lei nº 25, de 1937, define o caminho:",
      etapas: [
        {
          titulo: "Abertura de Processo",
          paragrafos: [
            [
              "O ",
              negrito("Iphan"),
              " abre o processo por conta própria ou a pedido de qualquer pessoa.",
            ],
            "A equipe técnica estuda se o bem merece proteção.",
          ],
        },
        {
          titulo: "Notificação do proprietário",
          paragrafos: [
            "O proprietário recebe a notificação e tem 15 dias para concordar ou contestar.",
          ],
        },
        {
          titulo: "Decisão",
          paragrafos: [
            [
              "Se o dono contesta, o",
              negrito(" Conselho Consultivo"),
              " do Iphan analisa o caso.",
            ],
            "Se ele não contesta, o processo segue direto para o Conselho;",
          ],
        },
        {
          titulo: "Registro",
          paragrafos: [
            [
              "Depois da aprovação, o órgão inscreve o bem no",
              negrito(" Livro do Tombo."),
            ],
          ],
        },
      ],
    },
    destaque: {
      titulo: "A proteção começa antes da decisão final",
      texto:
        "O tombamento provisório já produz os mesmos efeitos de proteção do definitivo. Isso significa que a proteção começa assim que o proprietário recebe a notificação, sem precisar esperar o fim da análise.",
      icone: iconePendente,
    },
  },

  protecao: {
    cabecalho: {
      titulo: [sublinhado("Quem protege"), " os prédios do Recife?"],
      paragrafos: [
        "Três esferas do poder público atuam na preservação do patrimônio da cidade:",
      ],
    },
    instituicoes: [
      {
        esfera: [sublinhado("Federal")],
        nome: "Iphan",
        logo: pendente("logo do Iphan, com licença de uso; Design"),
      },
      {
        esfera: [sublinhado("Estadual")],
        nome: "Fundarpe",
        logo: pendente("logo da Fundarpe, com licença de uso; Design"),
      },
      {
        esfera: [sublinhado("Municipal")],
        nome: "Prefeitura",
        logo: pendente(
          "logo da Prefeitura do Recife, com licença de uso; Design",
        ),
      },
    ],
    iep: [
      "Em 1997, a Prefeitura criou os ",
      negrito("Imóveis Especiais de Preservação"),
      " (IEP): prédios de arquitetura significativa que não podem ser demolidos.",
    ],
    obrigacao: [
      "Proprietários e moradores precisam manter as características originais desses imóveis ",
      negrito("por conta própria."),
    ],
    imagem: pendente(
      "imagem do capítulo 4 (837 × 268 no Desktop), com crédito e licença; Design e Jornalismo",
    ),
    impasse: [
      "É aqui que nasce um dos maiores impasses desta reportagem: ",
      negrito("preservar custa caro, e a "),
      negritoSublinhado("lei coloca a conta no dono."),
    ],
  },

  duracao: {
    cabecalho: {
      titulo: [sublinhado("Quanto tempo dura"), " um tombamento?"],
      paragrafos: [
        "O decreto fixa prazos curtos para cada etapa, mas não limita a duração total. Na prática, a análise pode durar anos. Dois casos mostram o tamanho da espera:",
      ],
    },
    estatisticas: [
      {
        numero: "23",
        unidade: "anos",
        legenda: "Processo em trâmite de um imóvel em São Paulo",
      },
      {
        numero: "18",
        unidade: "anos",
        legenda: "Espera de um terreiro na Bahia",
      },
    ],
    pendencia: pendente(
      "[Não encontramos um prazo médio oficial para os processos no Recife.]",
    ),
  },

  panorama: {
    cabecalho: {
      titulo: [
        sublinhado("Quantos prédios"),
        " vivem essa situação no Recife?",
      ],
      paragrafos: [
        "Quatro recortes ajudam a dimensionar a situação: o que a cidade protege, o que está abandonado, o que corre risco de cair e o que a espera custa. Cada levantamento usou um recorte diferente, por isso os números não se somam.",
      ],
    },
    protegidos: {
      titulo: "Prédios protegidos",
      estatisticas: [
        {
          numero: "263",
          legenda: "Imóveis Especiais de Preservação em 2022",
        },
        {
          numero: "47",
          legenda: "Bens tombados pelo Iphan em 2022",
        },
      ],
      observacao: [
        "Só nas zonas de preservação do centro histórico, a Prefeitura contou pelo menos ",
        negrito("4.191 imóveis."),
      ],
    },
    foraDaConta: {
      titulo: "E os que não estão nessa conta?",
      observacao: [
        "Só no bairro de Santo Antônio, um levantamento da ONG Habitat para a Humanidade identificou ",
        negrito("42 imóveis sem uso"),
      ],
      estatisticas: [
        {
          numero: "112",
          legenda: [
            "Prédios ",
            negrito("com mais de cinco andares"),
            " em algum estado de abandono.",
          ],
        },
        {
          numero: "136",
          legenda: [
            "Imóveis do centro com",
            negrito(" risco estrutural alto ou muito alto. "),
            "Segundo a Defesa Civil em 2025.",
          ],
        },
      ],
      pendencia: pendente(
        "[Os números vêm de levantamentos com recortes diferentes e não devem ser somados.]",
      ),
    },
    custo: {
      titulo: "O que a espera custa?",
      imagem: pendente(
        "foto da demolição na Rua da Guia (454 × 331 no Desktop), crédito e licença; Jornalismo",
      ),
      texto: [
        "O edifício nº 88 da Rua da Guia, no Bairro do Recife, passou ",
        negrito(
          "mais de 20 anos abandonado e dez sob monitoramento da Defesa Civil",
        ),
        ", até a ",
        negritoSublinhado("demolição"),
        " começar, em junho de 2022.",
      ],
      pendencia: pendente(
        "[Registro da demolição do edifício localizado na Rua da Guia, no Bairro do Recife.\n\nCrédito: a confirmar.]",
      ),
    },
  },
};
