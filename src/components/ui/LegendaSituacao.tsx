import type { SituacaoPredio } from "../../types/mapa";
import { COR_SITUACAO } from "./MarcadorPredio";

interface LegendaSituacaoProps {
  itens: readonly { situacao: SituacaoPredio; rotulo: string }[];
}

/** O Filtro do Figma não tem cor; sem esta legenda a cor do marcador não se lê. */
export function LegendaSituacao({ itens }: LegendaSituacaoProps) {
  return (
    <ul className="flex flex-wrap gap-x-espaco-5 gap-y-espaco-2 font-space-grotesk text-15 leading-mapa-corpo text-texto-suave">
      {itens.map((item) => (
        <li key={item.situacao} className="flex items-center gap-espaco-2">
          <span
            aria-hidden
            className={`size-4.5 rounded-raio-cheio border-2 border-noite-900 ${COR_SITUACAO[item.situacao]}`}
          />
          {item.rotulo}
        </li>
      ))}
    </ul>
  );
}
