import type {
  ConteudoGuia,
  ConteudoHero,
  ConteudoPrimeiraMateria,
  ConteudoQuebra,
  ItemNavegacao,
} from "../types/pagina-inicial";
import { pendente, provisorio } from "./pendente";
import { negrito, negritoSublinhado, sublinhado } from "./texto";

const PREENCHIMENTO =
  "texto de preenchimento do protótipo; o texto da reportagem vem do Jornalismo";
const SEM_FONTE =
  "fato ou número sem fonte em docs/fontes.md; Jornalismo registra fonte e ano";
const INTENCAO =
  "afirma intenção como fato (regra editorial 2); Jornalismo reformula";
const AUTORIA = "autoria e licença do texto; Jornalismo confirma";
const REPETIDO =
  "subtítulo repetido do capítulo 4 no protótipo; Jornalismo fornece o texto";

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

export const primeiraMateria: ConteudoPrimeiraMateria = {
  alvo: "o-recife",
  rotulo: "O Recife",
  titulo: provisorio("Título da Matéria", PREENCHIMENTO),
  blocos: [
    {
      subtitulo: provisorio("First subheader", PREENCHIMENTO),
      texto: provisorio(
        "The first paragraph of an article is often an introduction to the text. Sometimes it’s called the “lead,” and sometimes that word is spelled “lede.” When you’re writing an article—whether it’s for a blog or a review site or somewhere else—it’s always a good idea to begin with something interesting to hook a reader. If it’s a piece of thought leadership, maybe you want to start with a little anecdote, or a familiar problem. If you’re putting together something for businesses, you might start off with a relevant piece of data.",
        PREENCHIMENTO,
      ),
    },
    {
      subtitulo: provisorio(
        "Another subheader to break up text",
        PREENCHIMENTO,
      ),
      texto: provisorio(
        "The second paragraph of an article is sometimes called the “nut graph,” which is short for “nutshell paragraph.” That’s because this is usually where the article gets to the heart of the matter—the main point. After the first section, the reader is ready to hear what’s truly at stake in this piece of writing. They’re invested. They’re paying attention. If your piece is long enough to have long, multi-paragraph sections, then you’ll want to use this strategy throughout to make sure you’re holding reader attention in a consistent way.",
        PREENCHIMENTO,
      ),
    },
  ],
  citacao: {
    texto: provisorio(
      "“A large, heavily bolded quote for emphasis and breaking up content.”",
      PREENCHIMENTO,
    ),
    autor: provisorio("Full Name", PREENCHIMENTO),
  },
};

export const quebra: ConteudoQuebra = {
  estrofes: provisorio(
    [
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
    AUTORIA,
  ),
};

const iconePendente = pendente("ícone do conceito, Design");

export const guia: ConteudoGuia = {
  alvo: "guia-de-leitura",
  rotulo: "Guia de Leitura",
  titulo: "Conceitos importantes para entender esta reportagem",
  introducao:
    "Antes de seguir com a leitura, vale conhecer alguns conceitos que ajudam a entender o que vem pela frente.",

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
          "Mostram como as pessoas viviam, trabalhavam e se relacionam em cada época;",
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
          "Deterioração é o processo em que algo passa de um estado íntegro para um estado pior, sofrendo ",
          negrito("danos, desgaste ou perda de qualidade."),
        ],
        "Nesta reportagem, a palavra aparece em dois sentidos:",
      ],
    },
    sentidos: [
      {
        titulo: "Material Ou Física",
        texto:
          "Desgaste, estrago ou apodrecimento de estruturas pelo uso ou pela ação do tempo, como infiltrações, rachaduras e telhados que cedem.",
        icone: iconePendente,
      },
      {
        titulo: "Figurado",
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
          titulo: ["Objetiva mais ", sublinhado("proteção")],
          texto:
            "O tombamento impede a destruição, demolição, mutilação ou descaracterização do bem.",
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
            "Reformas, restaurações, pinturas e modificações precisam de autorização do órgão responsável.",
          icone: iconePendente,
        },
        {
          titulo: ["Existe ", sublinhado("indenização"), "?"],
          texto: provisorio(
            [
              "Em regra, não há indenização, ",
              negrito("pois o proprietário não perde o bem."),
              " A exceção é quando existe prejuízo anormal e comprovado.",
            ],
            SEM_FONTE,
          ),
          icone: iconePendente,
        },
      ],
    },
    funcionamento: {
      titulo: [negrito("Como funciona"), " o tombamento?"],
      introducao: provisorio(
        "Na esfera federal, o Decreto-Lei nº 25, de 1937, define o caminho:",
        SEM_FONTE,
      ),
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
            provisorio(
              "O proprietário recebe a notificação e tem 15 dias para concordar ou contestar.",
              SEM_FONTE,
            ),
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
      texto: provisorio(
        "O tombamento provisório já produz os mesmos efeitos de proteção do definitivo. Isso significa que a proteção começa assim que o proprietário recebe a notificação, sem precisar esperar o fim da análise.",
        SEM_FONTE,
      ),
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
    iep: provisorio(
      [
        "Em 1997, a Prefeitura criou os ",
        negrito("Imóveis Especiais de Preservação"),
        " (IEP): prédios de arquitetura significativa que não podem ser demolidos.",
      ],
      SEM_FONTE,
    ),
    obrigacao: provisorio(
      [
        "Proprietários e moradores precisam manter as características originais desses imóveis ",
        negrito("por conta própria."),
      ],
      SEM_FONTE,
    ),
    imagem: pendente(
      "imagem do capítulo 4 (837 × 268 no Desktop), com crédito e licença; Design e Jornalismo",
    ),
    impasse: provisorio(
      [
        "É aqui que nasce um dos maiores impasses desta reportagem: ",
        negrito("preservar custa caro, e a "),
        negritoSublinhado("lei coloca a conta no dono."),
      ],
      SEM_FONTE,
    ),
  },

  duracao: {
    cabecalho: {
      titulo: [sublinhado("Quanto tempo dura"), " um tombamento?"],
      paragrafos: ["Uma dimensão do problema aparece nos números:"],
    },
    estatisticas: [
      {
        numero: provisorio("23", SEM_FONTE),
        unidade: "anos",
        legenda: provisorio(
          "Processo em tramite de um imóvel em São Paulo",
          SEM_FONTE,
        ),
      },
      {
        numero: provisorio("18", SEM_FONTE),
        unidade: "anos",
        legenda: provisorio("Espera de um terreiro na Bahia", SEM_FONTE),
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
        provisorio(
          "Três esferas do poder público atuam na preservação do patrimônio da cidade:",
          REPETIDO,
        ),
      ],
    },
    protegidos: {
      titulo: "Prédios protegidos",
      estatisticas: [
        {
          numero: provisorio("263", SEM_FONTE),
          legenda: provisorio(
            "Imóveis Especiais de Preservação em 2022",
            SEM_FONTE,
          ),
        },
        {
          numero: provisorio("47", SEM_FONTE),
          legenda: provisorio("Bens tombados pelo Iphan em 2022", SEM_FONTE),
        },
      ],
      observacao: provisorio(
        [
          "Só nas zonas de preservação do centro histórico, a Prefeitura contou pelo menos ",
          negrito("4.191 imóveis."),
        ],
        SEM_FONTE,
      ),
    },
    foraDaConta: {
      titulo: "E os que não estão nessa conta?",
      observacao: provisorio(
        [
          "só no bairro de Santo Antônio, um levantamento da ONG Habitat para a Humanidade identificou ",
          negrito("42 imóveis sem uso"),
        ],
        SEM_FONTE,
      ),
      estatisticas: [
        {
          numero: provisorio("112", SEM_FONTE),
          legenda: provisorio(
            [
              "Prédios ",
              negrito("com mais de cinco andares"),
              " em algum estado de abandono.",
            ],
            SEM_FONTE,
          ),
        },
        {
          numero: provisorio("136", SEM_FONTE),
          legenda: provisorio(
            [
              "Imóveis do centro com",
              negrito(" risco estrutural alto ou muito alto. "),
              "Segundo a defesa civil em 2026",
            ],
            SEM_FONTE,
          ),
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
      texto: provisorio(
        [
          "O edifício nº 88 da Rua da Guia, no Bairro do Recife, passou ",
          negrito(
            "mais de 20 anos abandonado e dez sob monitoramento da Defesa Civil",
          ),
          ", até a ",
          negritoSublinhado("demolição"),
          " começar, em junho de 2022.",
        ],
        SEM_FONTE,
      ),
      pendencia: pendente(
        "[Registro da demolição do edifício localizado na Rua da Guia, no Bairro do Recife.\n\nCrédito: a confirmar.]",
      ),
    },
  },
};
