import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

// Larguras genéricas até haver breakpoints do Figma; revisar na Fase 2 (ADR-016).
const LARGURAS_RESPONSIVAS = "640;960;1280;1920";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has("responsiva")
          ? new URLSearchParams({
              w: LARGURAS_RESPONSIVAS,
              format: "avif;webp",
              as: "picture",
            })
          : new URLSearchParams(),
    }),
  ],
});
