import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { useVistaMapa } from "../../hooks/useVistaMapa";
import type {
  BaseMapa,
  IdIndicador,
  Predio,
  SerieIndicadores,
  SituacaoPredio,
  TextosMapa,
} from "../../types/mapa";
import { Container } from "../layout/Container";
import { FichaPredio, type CampoFicha } from "../ui/FichaPredio";
import { Filtro } from "../ui/Filtro";
import { GraficoSerie } from "../ui/GraficoSerie";
import { LegendaIndicador } from "../ui/LegendaIndicador";
import { LegendaSituacao } from "../ui/LegendaSituacao";
import {
  MapaInterativo,
  RAIO_MAXIMO_PX,
  type CartaoMapa,
} from "../ui/MapaInterativo";
import { RankingBairros } from "../ui/RankingBairros";
import { TabelaPredios } from "../ui/TabelaPredios";

interface MapaDosDadosProps {
  predios: readonly Predio[];
  base: BaseMapa;
  serie: SerieIndicadores;
  textos: TextosMapa;
}

const SITUACOES: readonly SituacaoPredio[] = [
  "abandonado",
  "reversao",
  "a_confirmar",
];

/**
 * Rampa sequencial de um só matiz com os tokens do projeto (cobre → terra),
 * conferida com o validador da skill dataviz: claridade monótona, degraus
 * distintos e o claro visível sobre o branco. Quatro classes por quartil
 * (ADR-021, adendo do mapa interativo).
 */
const CLASSES = [
  { fill: "fill-cobre-300", bg: "bg-cobre-300" },
  { fill: "fill-ferrugem-700", bg: "bg-ferrugem-700" },
  { fill: "fill-ferrugem-600", bg: "bg-ferrugem-600" },
  { fill: "fill-terra-900", bg: "bg-terra-900" },
] as const;
const COR_CIRCULO = "bg-dado-abandonado";
// O ranking flutua sobre o mapa: cinco linhas cabem sem cobrir o Centro.
const TAMANHO_RANKING = 5;
const PASSO_SERIE_MS = 900;
const K_MAXIMO = 14;
// Bairros pequenos do Centro encheriam a tela; até 6× ainda mostra os vizinhos.
const K_ENQUADRAMENTO = 6;
const PAINEL =
  "absolute z-10 bg-superficie p-espaco-4 shadow-cartao font-space-grotesk";

function quantil(ordenados: readonly number[], p: number) {
  if (ordenados.length === 0) return 0;
  const posicao = (ordenados.length - 1) * p;
  const abaixo = Math.floor(posicao);
  const a = ordenados[abaixo] ?? 0;
  const b = ordenados[Math.min(abaixo + 1, ordenados.length - 1)] ?? a;
  return a + (b - a) * (posicao - abaixo);
}

function formatarData(data: string) {
  const [ano, mes] = data.split("-");
  return mes ? `${mes}/${ano ?? ""}` : data;
}

function campos(predio: Predio, textos: TextosMapa): CampoFicha[] {
  const { campos: rotulos, valores } = textos;
  return [
    { rotulo: rotulos.bairro, valor: predio.bairro },
    { rotulo: rotulos.anoConstrucao, valor: String(predio.anoConstrucao) },
    { rotulo: rotulos.usoOriginal, valor: predio.usoOriginal },
    { rotulo: rotulos.usoAtual, valor: predio.usoAtual },
    {
      rotulo: rotulos.anosSemUso,
      valor:
        predio.anosSemUso === null ? valores.emUso : String(predio.anosSemUso),
    },
    {
      rotulo: rotulos.tombamento,
      valor: predio.tombamento.tombado
        ? `${valores.tombadoPor} ${predio.tombamento.orgao}`
        : valores.naoTombado,
    },
    {
      rotulo: rotulos.proprietario,
      valor: valores.proprietario[predio.tipoProprietario],
    },
    {
      rotulo: rotulos.peuc,
      valor: predio.notificacaoPeuc
        ? `${valores.peuc[predio.notificacaoPeuc.obrigacao]} ${formatarData(predio.notificacaoPeuc.dataNotificacao)}`
        : valores.semPeuc,
    },
  ];
}

export function MapaDosDados({
  predios,
  base,
  serie,
  textos,
}: MapaDosDadosProps) {
  const { anos, indicadores } = serie;
  const [indicadorId, setIndicadorId] = useState<IdIndicador>("taxaSemUso");
  const [iAno, setIAno] = useState(anos.length - 1);
  const [tocando, setTocando] = useState(false);
  const [bairroSelecionado, setBairroSelecionado] = useState<string | null>(
    null,
  );
  const [bairroRealcado, setBairroRealcado] = useState<string | null>(null);
  const [mostrarPredios, setMostrarPredios] = useState(true);
  const [predioSelecionado, setPredioSelecionado] = useState<string | null>(
    null,
  );

  const controle = useVistaMapa({
    lado: base.lado,
    kMaximo: K_MAXIMO,
    onToque: (alvo) => {
      const nome =
        alvo?.closest("[data-bairro]")?.getAttribute("data-bairro") ?? null;
      if (nome) selecionarBairro(nome, false);
      else fecharCartao();
    },
  });

  const indicador =
    indicadores.find((i) => i.id === indicadorId) ?? indicadores[0];
  const ano = anos[iAno] ?? anos.at(-1) ?? 0;
  const ehTaxa = indicador?.tipo === "taxa";
  const textoIndicador = textos.indicadores[indicadorId];

  const formatador = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: ehTaxa ? 1 : 0,
        minimumFractionDigits: ehTaxa ? 1 : 0,
      }),
    [ehTaxa],
  );
  const formatar = (v: number) => formatador.format(v);

  const estatisticas = useMemo(() => {
    const valores = indicador?.valores ?? {};
    const todos = Object.values(valores)
      .flat()
      .sort((a, b) => a - b);
    const quebras = [0.25, 0.5, 0.75].map((p) => quantil(todos, p));
    const maximo = todos.at(-1) ?? 0;
    const minimo = todos[0] ?? 0;
    const mediana = anos.map((_, i) =>
      quantil(
        Object.values(valores)
          .map((s) => s[i] ?? 0)
          .sort((a, b) => a - b),
        0.5,
      ),
    );
    return { quebras, maximo, minimo, mediana };
  }, [indicador, anos]);

  const classeDe = (v: number) =>
    estatisticas.quebras.filter((q) => v > q).length;

  const valoresAno = useMemo(() => {
    const resultado: Record<string, number> = {};
    for (const [nome, s] of Object.entries(indicador?.valores ?? {}))
      resultado[nome] = s[iAno] ?? 0;
    return resultado;
  }, [indicador, iAno]);

  const ordenados = useMemo(
    () => Object.entries(valoresAno).sort(([, a], [, b]) => b - a),
    [valoresAno],
  );
  const posicaoDe = (nome: string) =>
    ordenados.findIndex(([n]) => n === nome) + 1;

  const preenchimentos = useMemo(() => {
    const resultado: Record<string, string> = {};
    if (!ehTaxa) return resultado;
    for (const [nome, v] of Object.entries(valoresAno))
      resultado[nome] =
        CLASSES[estatisticas.quebras.filter((q) => v > q).length]?.fill ?? "";
    return resultado;
  }, [ehTaxa, valoresAno, estatisticas]);

  const circulos = useMemo(() => {
    if (ehTaxa) return null;
    const resultado: Record<string, number> = {};
    for (const [nome, v] of Object.entries(valoresAno))
      resultado[nome] =
        estatisticas.maximo > 0 ? Math.sqrt(v / estatisticas.maximo) : 0;
    return resultado;
  }, [ehTaxa, valoresAno, estatisticas]);

  useEffect(() => {
    if (!tocando) return;
    const id = window.setInterval(() => {
      setIAno((atual) => {
        if (atual >= anos.length - 1) {
          setTocando(false);
          return atual;
        }
        return atual + 1;
      });
    }, PASSO_SERIE_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [tocando, anos.length]);

  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key !== "Escape") return;
      setBairroSelecionado(null);
      setPredioSelecionado(null);
    }
    window.addEventListener("keydown", aoTeclar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
    };
  }, []);

  function alternarReproducao() {
    if (!tocando && iAno >= anos.length - 1) setIAno(0);
    setTocando(!tocando);
  }

  function fecharCartao() {
    setBairroSelecionado(null);
    setPredioSelecionado(null);
  }

  function selecionarBairro(nome: string, enquadrar = true) {
    setPredioSelecionado(null);
    if (nome === bairroSelecionado && !enquadrar) {
      setBairroSelecionado(null);
      return;
    }
    setBairroSelecionado(nome);
    const bairro = base.bairros.find((b) => b.nome === nome);
    if (bairro && enquadrar)
      controle.enquadrar(bairro.caixa, 0.45, K_ENQUADRAMENTO);
  }

  function selecionarPredio(id: string) {
    setBairroSelecionado(null);
    setPredioSelecionado(id === predioSelecionado ? null : id);
  }

  const rotuloPredio = (p: Predio) =>
    `${p.nome}, ${textos.situacoes[p.situacao]}`;
  const posicaoTexto = (nome: string) =>
    `${textos.posicao} ${String(posicaoDe(nome))} ${textos.de} ${String(ordenados.length)}`;

  const classesLegenda = ehTaxa
    ? CLASSES.map((c, i) => {
        const de = i === 0 ? estatisticas.minimo : estatisticas.quebras[i - 1];
        const ate =
          i === CLASSES.length - 1
            ? estatisticas.maximo
            : estatisticas.quebras[i];
        return {
          rotulo: `${formatar(de ?? 0)} – ${formatar(ate ?? 0)}`,
          classe: c.bg,
          quantidade: ordenados.filter(([, v]) => classeDe(v) === i).length,
        };
      })
    : undefined;

  const circulosLegenda = ehTaxa
    ? undefined
    : [1, 0.25, 0.04].map((fracao) => ({
        rotulo: formatar(Math.round(estatisticas.maximo * fracao)),
        raio: Math.sqrt(fracao),
      }));

  const maiorDoAno = ordenados[0]?.[1] ?? 0;
  const ranking = ordenados.slice(0, TAMANHO_RANKING).map(([nome, v]) => ({
    nome,
    valor: formatar(v),
    proporcao: maiorDoAno > 0 ? v / maiorDoAno : 0,
    classe: ehTaxa ? (CLASSES[classeDe(v)]?.bg ?? "") : COR_CIRCULO,
  }));

  const predio = predios.find((p) => p.id === predioSelecionado);
  const bairro = base.bairros.find((b) => b.nome === bairroSelecionado);
  const serieBairro = bairro ? indicador?.valores[bairro.nome] : undefined;

  let cartao: CartaoMapa | null = null;
  const pontoPredio = predio ? base.pontos[predio.id] : undefined;
  if (predio && pontoPredio) {
    cartao = {
      chave: `predio-${predio.id}`,
      ancora: pontoPredio,
      rotulo: predio.nome,
      conteudo: (
        <FichaPredio
          id="ficha-predio"
          aviso={textos.aviso}
          nome={predio.nome}
          situacao={predio.situacao}
          rotuloSituacao={textos.situacoes[predio.situacao]}
          campos={campos(predio, textos)}
          rotuloMemoria={textos.campos.memoria}
          memoria={predio.memoria}
          notas={[
            `${textos.valores.anoReferencia} ${String(predio.anoReferencia)}`,
            ...(predio.coordenada.coordenadaAproximada
              ? [textos.coordenadaAproximada]
              : []),
          ]}
        />
      ),
    };
  } else if (bairro && serieBairro) {
    const subtituloCartao = `${textoIndicador.nome} · ${posicaoTexto(bairro.nome)}`;
    const unidadeEAno = `${textoIndicador.unidade} · ${String(ano)}`;
    cartao = {
      chave: `bairro-${bairro.nome}`,
      ancora: bairro.centro,
      rotulo: bairro.nome,
      conteudo: (
        <div className="p-espaco-5 font-space-grotesk">
          <p className="font-ibm-plex-mono text-12 leading-apuracao text-destaque">
            {textos.aviso}
          </p>
          <h3 className="mt-espaco-2 pr-espaco-6 text-28 leading-mapa-ficha font-bold">
            {bairro.nome}
          </h3>
          <p className="mt-espaco-1 text-14 leading-apuracao text-texto-suave">
            {subtituloCartao}
          </p>
          <p className="mt-espaco-3 text-15 leading-mapa-corpo">
            <span className="text-40 leading-mapa-titulo font-bold tabular-nums">
              {formatar(serieBairro[iAno] ?? 0)}
            </span>{" "}
            {unidadeEAno}
          </p>
          <div className="mt-espaco-4">
            <GraficoSerie
              titulo={textos.serieTitulo}
              rotuloSerie={bairro.nome}
              rotuloReferencia={textos.medianaRecife}
              anos={anos}
              valores={serieBairro}
              referencia={estatisticas.mediana}
              maximo={estatisticas.maximo}
              anoAtual={ano}
              formatar={formatar}
            />
          </div>
        </div>
      ),
    };
  }

  const botaoIcone =
    "flex size-11 shrink-0 cursor-pointer items-center justify-center bg-terra-900 text-fundo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque";

  return (
    <section id="mapa-dos-dados" aria-labelledby="titulo-mapa">
      <div className="h-dvh w-full">
        <MapaInterativo
          base={base}
          controle={controle}
          preenchimentos={preenchimentos}
          circulos={circulos}
          bairroSelecionado={bairroSelecionado}
          bairroRealcado={bairroRealcado}
          onRealcar={setBairroRealcado}
          dica={(nome) => (
            <>
              <strong className="block text-15">{nome}</strong>
              <span className="block">
                {formatar(valoresAno[nome] ?? 0)} {textoIndicador.unidade}
              </span>
              <span className="block text-texto-suave">
                {posicaoTexto(nome)}
              </span>
            </>
          )}
          pontos={
            mostrarPredios
              ? predios.map((p) => ({
                  id: p.id,
                  situacao: p.situacao,
                  rotulo: rotuloPredio(p),
                }))
              : []
          }
          predioSelecionado={predioSelecionado}
          onSelecionarPredio={selecionarPredio}
          cartao={cartao}
          onFecharCartao={fecharCartao}
          rotulo={textos.rotuloMapa}
          textos={{
            ...textos.zoom,
            dicaRolagem: textos.dicaRolagem,
            fechar: textos.fechar,
          }}
        >
          <div
            data-sobreposicao
            className={`${PAINEL} top-espaco-3 right-espaco-3 left-espaco-3 md:right-auto md:w-md`}
          >
            <p className="inline-block bg-destaque px-espaco-2 py-espaco-1 font-ibm-plex-mono text-12 leading-apuracao text-sobre-destaque">
              {textos.aviso}
            </p>
            <h1
              id="titulo-mapa"
              className="mt-espaco-2 text-28 leading-mapa-titulo font-bold"
            >
              {textos.titulo}
            </h1>
            <fieldset className="mt-espaco-3">
              <legend className="sr-only">{textos.rotuloIndicadores}</legend>
              <div className="-mx-espaco-1 flex gap-espaco-2 overflow-x-auto px-espaco-1 pb-espaco-1 md:flex-wrap">
                {indicadores.map((i) => (
                  <div key={i.id} className="shrink-0">
                    <Filtro
                      rotulo={textos.indicadores[i.id].nome}
                      estado={i.id === indicadorId ? "ativo" : "inativo"}
                      onAlternar={() => {
                        setIndicadorId(i.id);
                      }}
                    />
                  </div>
                ))}
              </div>
            </fieldset>
            <div className="mt-espaco-2 flex items-end gap-espaco-3">
              <button
                type="button"
                aria-label={tocando ? textos.pausar : textos.tocar}
                title={tocando ? textos.pausar : textos.tocar}
                onClick={alternarReproducao}
                className={botaoIcone}
              >
                {tocando ? (
                  <PauseIcon aria-hidden size={20} weight="fill" />
                ) : (
                  <PlayIcon aria-hidden size={20} weight="fill" />
                )}
              </button>
              <label className="flex grow flex-col text-14 leading-apuracao text-texto-suave">
                <span className="flex justify-between">
                  {textos.rotuloAno}
                  <span className="font-bold text-texto tabular-nums">
                    {String(ano)}
                  </span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={anos.length - 1}
                  step={1}
                  value={iAno}
                  aria-valuetext={String(ano)}
                  onChange={(evento) => {
                    setTocando(false);
                    setIAno(Number(evento.target.value));
                  }}
                  className="h-11 w-full cursor-pointer accent-terra-900"
                />
              </label>
              <Filtro
                rotulo={textos.mostrarPredios}
                estado={mostrarPredios ? "ativo" : "inativo"}
                onAlternar={() => {
                  setMostrarPredios(!mostrarPredios);
                }}
              />
            </div>
          </div>

          <div
            data-sobreposicao
            className={`${PAINEL} bottom-espaco-3 left-espaco-3 max-w-xs`}
          >
            <p className="text-15 leading-mapa-corpo font-bold">
              {textoIndicador.nome}
            </p>
            <div className="mt-espaco-2">
              <LegendaIndicador
                titulo={ehTaxa ? textos.legendaClasses : textos.legendaCirculos}
                sufixoQuantidade={textos.bairrosNaClasse}
                total={ordenados.length}
                classes={classesLegenda}
                circulos={circulosLegenda}
                raioMaximoPx={RAIO_MAXIMO_PX}
              />
            </div>
            {mostrarPredios && (
              <div className="mt-espaco-3 hidden text-14 leading-apuracao md:block">
                <p className="text-texto-suave">{textos.legendaPredios}</p>
                <div className="mt-espaco-1">
                  <LegendaSituacao
                    itens={SITUACOES.map((situacao) => ({
                      situacao,
                      rotulo: textos.situacoes[situacao],
                    }))}
                  />
                </div>
              </div>
            )}
          </div>

          <div
            data-sobreposicao
            data-ranking
            className={`${PAINEL} top-espaco-3 right-espaco-3 hidden w-72 lg:block`}
          >
            <RankingBairros
              titulo={textos.ranking}
              itens={ranking}
              selecionado={bairroSelecionado}
              onSelecionar={selecionarBairro}
              onRealcar={setBairroRealcado}
            />
          </div>
        </MapaInterativo>
      </div>

      <Container className="flex flex-col gap-espaco-6 py-espaco-8">
        <div className="max-w-2xl font-space-grotesk text-15 leading-mapa-corpo text-texto-suave">
          <p>{textos.introducao}</p>
          <p className="mt-espaco-2">{textos.dicaGestos}</p>
          <p className="mt-espaco-2 font-ibm-plex-mono text-12 leading-apuracao">
            {textos.regraCodificacao}
          </p>
        </div>
        <div className="max-h-128 overflow-y-auto">
          <TabelaPredios
            id="legenda-tabela-bairros"
            legenda={`${textos.tabelaBairros.legenda}: ${textoIndicador.nome}`}
            aviso={textos.aviso}
            cabecalhos={[textos.tabelaBairros.bairro, ...anos.map(String)]}
            linhas={ordenados.map(([nome]) => ({
              id: nome,
              nome,
              valores: (indicador?.valores[nome] ?? []).map(formatar),
            }))}
            vazia={textos.tabela.vazia}
            selecionadoId={bairroSelecionado}
            onSelecionar={selecionarBairro}
          />
        </div>
        <TabelaPredios
          legenda={textos.tabela.legenda}
          aviso={textos.aviso}
          cabecalhos={[
            textos.tabela.predio,
            textos.campos.situacao,
            textos.campos.bairro,
            textos.campos.anoConstrucao,
            textos.campos.usoOriginal,
            textos.campos.usoAtual,
            textos.campos.anosSemUso,
            textos.campos.tombamento,
            textos.campos.proprietario,
            textos.campos.peuc,
          ]}
          linhas={predios.map((p) => ({
            id: p.id,
            nome: p.nome,
            valores: [
              textos.situacoes[p.situacao],
              ...campos(p, textos).map((c) => c.valor),
            ],
          }))}
          vazia={textos.tabela.vazia}
          selecionadoId={predioSelecionado}
          onSelecionar={selecionarPredio}
        />
      </Container>
    </section>
  );
}
