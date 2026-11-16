import type { SituacaoPredio } from "../../types/mapa";
import { COR_SITUACAO } from "./MarcadorPredio";

export interface CampoFicha {
  rotulo: string;
  valor: string;
}

interface FichaPredioProps {
  id: string;
  abaId: string;
  aviso: string;
  nome: string;
  situacao: SituacaoPredio;
  rotuloSituacao: string;
  campos: readonly CampoFicha[];
  rotuloMemoria: string;
  memoria: string;
  notas: readonly string[];
}

export function FichaPredio({
  id,
  abaId,
  aviso,
  nome,
  situacao,
  rotuloSituacao,
  campos,
  rotuloMemoria,
  memoria,
  notas,
}: FichaPredioProps) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={abaId}
      className="bg-superficie p-espaco-5"
    >
      <p className="font-ibm-plex-mono text-12 leading-apuracao text-destaque">
        {aviso}
      </p>
      <h2 className="mt-espaco-3 font-space-grotesk text-28 leading-mapa-ficha font-bold">
        {nome}
      </h2>
      <p className="mt-espaco-3 inline-flex items-center gap-espaco-2 font-space-grotesk text-15 leading-mapa-corpo">
        <span
          aria-hidden
          className={`size-4.5 rounded-raio-cheio border-2 border-noite-900 ${COR_SITUACAO[situacao]}`}
        />
        {rotuloSituacao}
      </p>
      <dl className="mt-espaco-5 grid grid-cols-2 gap-x-espaco-4 gap-y-espaco-3 font-space-grotesk text-15 leading-mapa-corpo">
        {campos.map((campo) => (
          <div key={campo.rotulo}>
            <dt className="text-texto-suave">{campo.rotulo}</dt>
            <dd>{campo.valor}</dd>
          </div>
        ))}
      </dl>
      <h3 className="mt-espaco-5 font-space-grotesk text-15 leading-mapa-corpo text-texto-suave">
        {rotuloMemoria}
      </h3>
      <p className="font-space-grotesk text-15 leading-mapa-corpo">{memoria}</p>
      {notas.map((nota) => (
        <p
          key={nota}
          className="mt-espaco-3 font-ibm-plex-mono text-12 leading-apuracao text-texto-suave"
        >
          {nota}
        </p>
      ))}
    </div>
  );
}
