import { ROTULO_PENDENTE } from "../../content/pendente";
import type { Pendente } from "../../types/content";

interface BlocoPendenteProps {
  pendencia: Pendente;
}

/**
 * Bloco tarjado de conteúdo pendente. Ferramenta de desenvolvimento,
 * fora do design system: o estilo vive em .bloco-pendente (global.css).
 */
export function BlocoPendente({ pendencia }: BlocoPendenteProps) {
  return (
    <div className="bloco-pendente" data-pendente>
      <span>
        <strong>{ROTULO_PENDENTE}</strong> {pendencia.descricao}
      </span>
    </div>
  );
}
