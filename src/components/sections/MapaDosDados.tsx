import { useState, type KeyboardEvent } from "react";
import type {
  BaseMapa,
  NomeEnquadramento,
  Predio,
  SituacaoPredio,
  TextosMapa,
} from "../../types/mapa";
import { AbaPredio } from "../ui/AbaPredio";
import { Filtro } from "../ui/Filtro";
import { FichaPredio, type CampoFicha } from "../ui/FichaPredio";
import { LegendaSituacao } from "../ui/LegendaSituacao";
import { estaNoQuadro, MapaPredios } from "../ui/MapaPredios";
import { TabelaPredios } from "../ui/TabelaPredios";
import { Container } from "../layout/Container";

interface MapaDosDadosProps {
  predios: readonly Predio[];
  base: BaseMapa;
  textos: TextosMapa;
}

const SITUACOES: readonly SituacaoPredio[] = [
  "abandonado",
  "reversao",
  "a_confirmar",
];
const ENQUADRAMENTOS: readonly NomeEnquadramento[] = ["recife", "centro"];
const PAINEL_ID = "ficha-predio";
const abaId = (id: string) => `aba-${id}`;

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

export function MapaDosDados({ predios, base, textos }: MapaDosDadosProps) {
  const [situacoesAtivas, setSituacoesAtivas] = useState<
    ReadonlySet<SituacaoPredio>
  >(() => new Set(SITUACOES));
  const [selecionadoId, setSelecionadoId] = useState<string | null>(null);
  const [enquadramento, setEnquadramento] =
    useState<NomeEnquadramento>("centro");

  const visiveis = predios.filter((p) => situacoesAtivas.has(p.situacao));
  const selecionado = visiveis.find((p) => p.id === selecionadoId) ?? null;

  function selecionar(id: string) {
    setSelecionadoId(id);
    if (!estaNoQuadro(base, enquadramento, id)) setEnquadramento("recife");
  }

  const todasAtivas = situacoesAtivas.size === SITUACOES.length;

  // Com "Todos" ativo, escolher uma situação isola essa situação; desmarcar
  // a última volta a "Todos", para o mapa nunca ficar vazio.
  function alternarSituacao(situacao: SituacaoPredio) {
    setSituacoesAtivas((atuais) => {
      if (atuais.size === SITUACOES.length) return new Set([situacao]);
      const novas = new Set(atuais);
      if (novas.has(situacao)) novas.delete(situacao);
      else novas.add(situacao);
      return novas.size === 0 ? new Set(SITUACOES) : novas;
    });
  }

  function navegarAbas(evento: KeyboardEvent<HTMLButtonElement>, i: number) {
    const ultimo = visiveis.length - 1;
    const destino = {
      ArrowRight: i === ultimo ? 0 : i + 1,
      ArrowLeft: i === 0 ? ultimo : i - 1,
      Home: 0,
      End: ultimo,
    }[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    const alvo = visiveis[destino];
    if (!alvo) return;
    selecionar(alvo.id);
    document.getElementById(abaId(alvo.id))?.focus();
  }

  const rotuloPonto = (p: Predio) =>
    `${p.nome}, ${textos.situacoes[p.situacao]}`;

  return (
    <section
      id="mapa-dos-dados"
      aria-labelledby="titulo-mapa"
      className="py-espaco-7 lg:pb-espaco-9"
    >
      <Container>
        <h1
          id="titulo-mapa"
          className="font-space-grotesk text-34 leading-mapa-titulo font-bold"
        >
          {textos.titulo}
        </h1>
        <p className="mt-espaco-3 max-w-2xl font-space-grotesk text-15 leading-mapa-corpo text-texto-suave">
          {textos.introducao}
        </p>

        <div className="mt-espaco-6 grid gap-espaco-6 lg:grid-cols-2">
          <div className="flex flex-col gap-espaco-4">
            <fieldset className="flex flex-wrap items-start gap-espaco-2">
              <legend className="sr-only">{textos.rotuloEnquadramentos}</legend>
              {ENQUADRAMENTOS.map((nome) => (
                <Filtro
                  key={nome}
                  rotulo={textos.enquadramentos[nome]}
                  estado={enquadramento === nome ? "ativo" : "inativo"}
                  onAlternar={() => {
                    setEnquadramento(nome);
                  }}
                />
              ))}
            </fieldset>
            <MapaPredios
              base={base}
              enquadramento={enquadramento}
              pontos={visiveis.map((p) => ({
                id: p.id,
                situacao: p.situacao,
                rotulo: rotuloPonto(p),
              }))}
              selecionadoId={selecionado?.id ?? null}
              onSelecionar={selecionar}
              rotulo={textos.rotuloMapa}
              aviso={textos.aviso}
            />
            <LegendaSituacao
              itens={SITUACOES.map((situacao) => ({
                situacao,
                rotulo: textos.situacoes[situacao],
              }))}
            />
          </div>

          <div className="flex flex-col gap-espaco-5">
            <fieldset>
              <legend className="font-space-grotesk text-15 leading-mapa-corpo text-texto-suave">
                {textos.rotuloFiltros}
              </legend>
              <div className="mt-espaco-2 flex flex-wrap items-start gap-espaco-2">
                <Filtro
                  rotulo={textos.todos}
                  estado={todasAtivas ? "ativo" : "inativo"}
                  onAlternar={() => {
                    setSituacoesAtivas(new Set(SITUACOES));
                  }}
                />
                {SITUACOES.map((situacao) => (
                  <Filtro
                    key={situacao}
                    rotulo={textos.situacoes[situacao]}
                    estado={
                      !todasAtivas && situacoesAtivas.has(situacao)
                        ? "ativo"
                        : "inativo"
                    }
                    onAlternar={() => {
                      alternarSituacao(situacao);
                    }}
                  />
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-espaco-5 bg-fundo p-espaco-5">
              <div
                role="tablist"
                aria-label={textos.rotuloAbas}
                className="flex flex-wrap gap-espaco-2"
              >
                {visiveis.map((p, i) => (
                  <AbaPredio
                    key={p.id}
                    id={abaId(p.id)}
                    painelId={PAINEL_ID}
                    numero={String(predios.indexOf(p) + 1).padStart(2, "0")}
                    rotulo={p.nome}
                    estado={p.id === selecionado?.id ? "ativa" : "inativa"}
                    focavel={selecionado === null && i === 0}
                    onAtivar={() => {
                      selecionar(p.id);
                    }}
                    onTeclado={(evento) => {
                      navegarAbas(evento, i);
                    }}
                  />
                ))}
              </div>

              {selecionado ? (
                <FichaPredio
                  id={PAINEL_ID}
                  abaId={abaId(selecionado.id)}
                  aviso={textos.aviso}
                  nome={selecionado.nome}
                  situacao={selecionado.situacao}
                  rotuloSituacao={textos.situacoes[selecionado.situacao]}
                  campos={campos(selecionado, textos)}
                  rotuloMemoria={textos.campos.memoria}
                  memoria={selecionado.memoria}
                  notas={[
                    `${textos.valores.anoReferencia} ${String(selecionado.anoReferencia)}`,
                    ...(selecionado.coordenada.coordenadaAproximada
                      ? [textos.coordenadaAproximada]
                      : []),
                  ]}
                />
              ) : (
                <p
                  id={PAINEL_ID}
                  role="tabpanel"
                  className="font-space-grotesk text-15 leading-mapa-corpo text-texto-suave"
                >
                  {textos.fichaVazia}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-espaco-7">
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
            linhas={visiveis.map((p) => ({
              id: p.id,
              nome: p.nome,
              valores: [
                textos.situacoes[p.situacao],
                ...campos(p, textos).map((c) => c.valor),
              ],
            }))}
            vazia={textos.tabela.vazia}
            selecionadoId={selecionado?.id ?? null}
            onSelecionar={selecionar}
          />
        </div>
      </Container>
    </section>
  );
}
