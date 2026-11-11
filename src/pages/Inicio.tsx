import { site } from "../content/site";

/**
 * Rota mínima da Fase 1. Será substituída pela página do protótipo
 * na Fase 4.
 */
export function Inicio() {
  return (
    <main>
      <h1>{site.nome}</h1>
    </main>
  );
}
