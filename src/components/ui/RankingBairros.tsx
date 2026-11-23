export interface ItemRanking {
  nome: string;
  valor: string;
  /** 0 a 1, em relação ao maior valor da lista. */
  proporcao: number;
  classe: string;
}

interface RankingBairrosProps {
  titulo: string;
  itens: readonly ItemRanking[];
  selecionado: string | null;
  onSelecionar: (nome: string) => void;
  onRealcar: (nome: string | null) => void;
}

export function RankingBairros({
  titulo,
  itens,
  selecionado,
  onSelecionar,
  onRealcar,
}: RankingBairrosProps) {
  return (
    <div className="font-space-grotesk text-14 leading-apuracao">
      <h3 className="text-texto-suave">{titulo}</h3>
      <ol className="mt-espaco-2 flex flex-col">
        {itens.map((item, i) => (
          <li key={item.nome}>
            <button
              type="button"
              aria-pressed={item.nome === selecionado}
              onClick={() => {
                onSelecionar(item.nome);
              }}
              onPointerEnter={() => {
                onRealcar(item.nome);
              }}
              onPointerLeave={() => {
                onRealcar(null);
              }}
              onFocus={() => {
                onRealcar(item.nome);
              }}
              onBlur={() => {
                onRealcar(null);
              }}
              className={`grid min-h-11 w-full cursor-pointer grid-cols-2 items-center gap-espaco-3 px-espaco-2 text-left hover:bg-papel-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque ${item.nome === selecionado ? "bg-papel-200" : ""}`}
            >
              <span className="flex gap-espaco-2 truncate">
                <span className="w-5 shrink-0 text-right text-texto-suave tabular-nums">
                  {String(i + 1)}
                </span>
                <span className="truncate">{item.nome}</span>
              </span>
              <span className="flex items-center gap-espaco-2">
                <span aria-hidden className="h-2 grow">
                  <span
                    style={{ transform: `scaleX(${String(item.proporcao)})` }}
                    className={`block h-full origin-left rounded-r-raio-1 transition-transform duration-300 ease-out-cubic ${item.classe}`}
                  />
                </span>
                <span className="w-12 shrink-0 text-right tabular-nums">
                  {item.valor}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
