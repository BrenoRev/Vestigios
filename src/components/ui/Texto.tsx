import { ehProvisorio } from "../../content/pendente";
import type {
  Texto as TextoConteudo,
  TextoRico,
  Trecho,
} from "../../types/content";

function Pedaco({ trecho }: { trecho: Trecho }) {
  if (typeof trecho === "string") return trecho;
  const classes = [
    trecho.negrito ? "font-bold" : "",
    trecho.sublinhado ? "underline decoration-from-font" : "",
  ].join(" ");
  return <span className={classes}>{trecho.texto}</span>;
}

function Rico({ valor }: { valor: TextoRico }) {
  if (typeof valor === "string") return valor;
  return valor.map((trecho, indice) => <Pedaco key={indice} trecho={trecho} />);
}

export function Texto({ valor }: { valor: TextoConteudo }) {
  if (!ehProvisorio(valor)) return <Rico valor={valor} />;
  return <Rico valor={valor.conteudo} />;
}
