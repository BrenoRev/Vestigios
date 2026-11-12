import type { Pendente } from "../types/content";

/**
 * Diga o que falta e quem deve fornecer: pendente("legenda da foto 3, Jornalismo").
 * scripts/check-conteudo.mjs bloqueia a produção enquanto houver chamadas em
 * src/; este arquivo é a única exceção.
 */
export function pendente(descricao: string): Pendente {
  return { tipo: "pendente", descricao };
}

export function ehPendente(valor: unknown): valor is Pendente {
  return (
    typeof valor === "object" &&
    valor !== null &&
    "tipo" in valor &&
    valor.tipo === "pendente"
  );
}

/** Fica aqui, e não no componente, por causa da trava de texto em JSX do ESLint. */
export const ROTULO_PENDENTE = "PENDENTE";
