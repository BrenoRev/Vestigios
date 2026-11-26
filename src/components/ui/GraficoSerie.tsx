interface GraficoSerieProps {
  titulo: string;
  rotuloSerie: string;
  rotuloReferencia: string;
  anos: readonly number[];
  valores: readonly number[];
  referencia: readonly number[];
  /** Topo do eixo: o maior valor do indicador, para todos os bairros. */
  maximo: number;
  anoAtual: number;
  formatar: (valor: number) => string;
}

const LARGURA = 300;
const ALTURA = 120;
const MARGEM = { topo: 12, direita: 12, base: 20, esquerda: 36 };

/**
 * O eixo começa em zero e vai até o máximo do indicador em toda a cidade,
 * não do bairro: um bairro estável não parece em disparada só porque a
 * escala se ajustou a ele (Cairo, How charts lie).
 */
export function GraficoSerie({
  titulo,
  rotuloSerie,
  rotuloReferencia,
  anos,
  valores,
  referencia,
  maximo,
  anoAtual,
  formatar,
}: GraficoSerieProps) {
  const largura = LARGURA - MARGEM.esquerda - MARGEM.direita;
  const altura = ALTURA - MARGEM.topo - MARGEM.base;
  const x = (i: number) =>
    MARGEM.esquerda + (anos.length > 1 ? (i / (anos.length - 1)) * largura : 0);
  const y = (v: number) =>
    MARGEM.topo + altura - (maximo > 0 ? (v / maximo) * altura : 0);
  const linha = (serie: readonly number[]) =>
    serie
      .map((v, i) => `${i === 0 ? "M" : "L"}${String(x(i))},${String(y(v))}`)
      .join("");
  const iAtual = Math.max(0, anos.indexOf(anoAtual));
  const valorAtual = valores[iAtual] ?? 0;
  const primeiro = anos[0];
  const ultimo = anos.at(-1);

  return (
    <figure className="font-space-grotesk">
      <figcaption className="text-14 leading-apuracao text-texto-suave">
        {titulo}
      </figcaption>
      <svg
        aria-hidden
        viewBox={`0 0 ${String(LARGURA)} ${String(ALTURA)}`}
        className="mt-espaco-2 w-full"
      >
        {[0, maximo].map((v) => (
          <g key={v}>
            <line
              x1={MARGEM.esquerda}
              x2={LARGURA - MARGEM.direita}
              y1={y(v)}
              y2={y(v)}
              className="stroke-papel-200"
            />
            <text
              x={MARGEM.esquerda - 6}
              y={y(v) + 4}
              textAnchor="end"
              className="fill-texto-suave text-12"
            >
              {formatar(v)}
            </text>
          </g>
        ))}
        <line
          x1={x(iAtual)}
          x2={x(iAtual)}
          y1={MARGEM.topo}
          y2={MARGEM.topo + altura}
          className="stroke-tinta-300"
        />
        <path
          d={linha(referencia)}
          strokeDasharray="4 4"
          className="fill-none stroke-tinta-600 stroke-2"
        />
        <path
          d={linha(valores)}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="fill-none stroke-ferrugem-700 stroke-2"
        />
        <circle
          cx={x(iAtual)}
          cy={y(valorAtual)}
          r={4.5}
          className="fill-ferrugem-700 stroke-superficie stroke-2"
        />
        {primeiro !== undefined && ultimo !== undefined && (
          <>
            <text
              x={x(0)}
              y={ALTURA - 4}
              textAnchor="start"
              className="fill-texto-suave text-12"
            >
              {String(primeiro)}
            </text>
            <text
              x={x(anos.length - 1)}
              y={ALTURA - 4}
              textAnchor="end"
              className="fill-texto-suave text-12"
            >
              {String(ultimo)}
            </text>
          </>
        )}
      </svg>
      <ul className="mt-espaco-1 flex flex-wrap gap-x-espaco-4 text-12 leading-apuracao text-texto-suave">
        <li className="flex items-center gap-espaco-2">
          <span aria-hidden className="h-0.5 w-4 bg-ferrugem-700" />
          {rotuloSerie}
        </li>
        <li className="flex items-center gap-espaco-2">
          <span aria-hidden className="h-0.5 w-4 bg-tinta-600" />
          {rotuloReferencia}
        </li>
      </ul>
    </figure>
  );
}
