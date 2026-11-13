import type { Pendente, Provisorio } from "../types/content";

/**
 * Diga o que falta e quem deve fornecer: pendente("legenda da foto 3, Jornalismo").
 * scripts/check-conteudo.mjs avisa (ou bloqueia a produção, ADR-019) enquanto
 * houver chamadas em src/; este arquivo é a única exceção.
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

/**
 * Texto do protótipo ainda sem confirmação: provisorio(texto, "o que falta, quem confirma").
 * Fica marcado na tela e entra no aviso de scripts/check-conteudo.mjs.
 */
export function provisorio<T>(conteudo: T, motivo: string): Provisorio<T> {
  return { tipo: "provisorio", conteudo, motivo };
}

export function ehProvisorio(valor: unknown): valor is Provisorio<unknown> {
  return (
    typeof valor === "object" &&
    valor !== null &&
    "tipo" in valor &&
    valor.tipo === "provisorio"
  );
}
