import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

// Declarados à mão para não depender do pacote globals (ADR-002).
const globaisNode = {
  console: "readonly",
  process: "readonly",
  URL: "readonly",
};

const MSG_TEXTO =
  "Texto editorial não pode ficar dentro de componente. Coloque em src/content/ e receba por props (CLAUDE.md, seção Conteúdo).";
const MSG_ARBITRARIO =
  "Valor arbitrário do Tailwind é proibido. Use apenas tokens de src/styles/tokens.css, extraídos do Figma (DESIGN_SYSTEM.md).";

export default defineConfig(
  { ignores: ["dist/", "node_modules/", ".vercel/"] },

  {
    files: ["**/*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globaisNode },
  },

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      reactHooks.configs.flat.recommended,
      jsxA11y.flatConfigs.strict,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: "JSXText[value=/\\S/]", message: MSG_TEXTO },
        {
          selector:
            "JSXElement > JSXExpressionContainer > Literal[value=/\\S/]",
          message: MSG_TEXTO,
        },
        {
          selector: "JSXElement > JSXExpressionContainer > TemplateLiteral",
          message: MSG_TEXTO,
        },
        {
          selector:
            "JSXAttribute[name.name=/^(alt|title|placeholder|aria-label|aria-description|aria-roledescription)$/] > Literal",
          message: MSG_TEXTO,
        },
        {
          selector: "JSXAttribute[name.name='className'] Literal[value=/\\[/]",
          message: MSG_ARBITRARIO,
        },
        {
          selector:
            "JSXAttribute[name.name='className'] TemplateElement[value.raw=/\\[/]",
          message: MSG_ARBITRARIO,
        },
      ],
    },
  },
);
