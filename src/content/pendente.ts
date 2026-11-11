import type { Pendente } from "../types/content";

/**
 * Placeholder honesto. Use onde faltar conteúdo, sempre dizendo o que
 * falta e quem deve fornecer:
 *
 *   pendente("legenda da foto 3, equipe de Jornalismo")
 *
 * Em desenvolvimento o componente BlocoPendente mostra um bloco tarjado.
 * scripts/check-conteudo.mjs falha a build de produção enquanto houver
 * qualquer chamada restante em src/. Este arquivo é a única exceção.
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

/** Rótulo da ferramenta de desenvolvimento. Não é texto editorial. */
export const ROTULO_PENDENTE = "PENDENTE";
