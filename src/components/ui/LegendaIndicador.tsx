interface ClasseLegenda {
  rotulo: string;
  classe: string;
  quantidade: number;
}

interface LegendaIndicadorProps {
  titulo: string;
  sufixoQuantidade: string;
  total: number;
  /** Coroplético: uma linha por classe. */
  classes?: readonly ClasseLegenda[];
  /** Símbolo proporcional: círculos de referência, do maior ao menor. */
  circulos?: readonly { rotulo: string; raio: number }[];
  /** Raio em px do maior círculo, o mesmo do mapa na tela. */
  raioMaximoPx?: number;
}

export function LegendaIndicador({
  titulo,
  sufixoQuantidade,
  total,
  classes,
  circulos,
  raioMaximoPx = 28,
}: LegendaIndicadorProps) {
  const r = raioMaximoPx;
  const lado = r * 2 + 2;
  return (
    <div className="font-space-grotesk text-14 leading-apuracao">
      <p className="text-texto-suave">{titulo}</p>
      {classes && (
        <ul className="mt-espaco-2 flex flex-col gap-espaco-1">
          {classes.map((item) => (
            <li key={item.rotulo} className="flex items-center gap-espaco-2">
              <span aria-hidden className={`h-4 w-6 shrink-0 ${item.classe}`} />
              <span className="w-28 shrink-0 whitespace-nowrap tabular-nums">
                {item.rotulo}
              </span>
              <span aria-hidden className="h-2 grow bg-papel-200">
                <span
                  style={{
                    transform: `scaleX(${String(total ? item.quantidade / total : 0)})`,
                  }}
                  className={`block h-full origin-left rounded-r-raio-1 transition-transform duration-300 ease-out-cubic ${item.classe}`}
                />
              </span>
              <span className="w-20 shrink-0 text-right text-texto-suave tabular-nums">
                {item.quantidade} {sufixoQuantidade}
              </span>
            </li>
          ))}
        </ul>
      )}
      {circulos && (
        <div className="mt-espaco-2 flex items-end gap-espaco-4">
          <svg
            aria-hidden
            width={lado}
            height={lado}
            viewBox={`0 0 ${String(lado)} ${String(lado)}`}
            className="shrink-0"
          >
            {circulos.map((c) => (
              <circle
                key={c.rotulo}
                cx={r + 1}
                cy={r * 2 + 1 - r * c.raio}
                r={r * c.raio}
                className="fill-none stroke-terra-900"
              />
            ))}
          </svg>
          <ul className="flex flex-col gap-espaco-1 text-texto-suave">
            {circulos.map((c) => (
              <li key={c.rotulo}>{c.rotulo}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
