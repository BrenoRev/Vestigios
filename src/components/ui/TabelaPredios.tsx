export interface LinhaTabela {
  id: string;
  nome: string;
  valores: readonly string[];
}

interface TabelaPrediosProps {
  id?: string;
  legenda: string;
  aviso: string;
  cabecalhos: readonly string[];
  linhas: readonly LinhaTabela[];
  vazia: string;
  selecionadoId: string | null;
  onSelecionar: (id: string) => void;
}

export function TabelaPredios({
  id = "legenda-tabela",
  legenda,
  aviso,
  cabecalhos,
  linhas,
  vazia,
  selecionadoId,
  onSelecionar,
}: TabelaPrediosProps) {
  return (
    <div>
      <h2
        id={id}
        className="font-space-grotesk text-28 leading-mapa-ficha font-bold"
      >
        {legenda}
      </h2>
      <p className="mt-espaco-1 font-ibm-plex-mono text-12 leading-apuracao text-destaque">
        {aviso}
      </p>
      <div className="mt-espaco-3 overflow-x-auto">
        <table
          aria-labelledby={id}
          className="w-full border-collapse text-left font-space-grotesk text-15 leading-mapa-corpo"
        >
          <thead>
            <tr className="border-b border-borda text-texto-suave">
              {cabecalhos.map((cabecalho) => (
                <th
                  key={cabecalho}
                  scope="col"
                  className="py-espaco-2 pr-espaco-4 font-normal whitespace-nowrap"
                >
                  {cabecalho}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.length === 0 ? (
              <tr>
                <td colSpan={cabecalhos.length} className="py-espaco-3">
                  {vazia}
                </td>
              </tr>
            ) : (
              linhas.map((linha) => (
                <tr
                  key={linha.id}
                  className={`border-b border-borda ${linha.id === selecionadoId ? "bg-superficie" : ""}`}
                >
                  <th scope="row" className="pr-espaco-4 align-top font-normal">
                    <button
                      type="button"
                      aria-pressed={linha.id === selecionadoId}
                      onClick={() => {
                        onSelecionar(linha.id);
                      }}
                      className="inline-flex min-h-11 cursor-pointer items-center text-left whitespace-nowrap underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque"
                    >
                      {linha.nome}
                    </button>
                  </th>
                  {linha.valores.map((valor, i) => (
                    <td
                      key={cabecalhos[i + 1] ?? i}
                      className="py-espaco-3 pr-espaco-4 align-top"
                    >
                      {valor}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
