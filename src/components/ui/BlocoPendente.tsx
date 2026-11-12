import { ROTULO_PENDENTE } from "../../content/pendente";
import type { Pendente } from "../../types/content";

interface BlocoPendenteProps {
  pendencia: Pendente;
}

export function BlocoPendente({ pendencia }: BlocoPendenteProps) {
  return (
    <div className="bloco-pendente" data-pendente>
      <span>
        <strong>{ROTULO_PENDENTE}</strong> {pendencia.descricao}
      </span>
    </div>
  );
}
