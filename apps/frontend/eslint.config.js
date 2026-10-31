import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Never lint generated output
  globalIgnores(["build", ".react-router", "coverage"]),

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      // React Router route files export these alongside the component
      "react-refresh/only-export-components": [
        "warn",
        {
          allowExportNames: [
            "meta",
            "links",
            "headers",
            "loader",
            "action",
            "clientLoader",
            "clientAction",
            "ErrorBoundary",
            "HydrateFallback",
            "shouldRevalidate",
            "handle",
          ],
        },
      ],
    },
  },

  // shadcn components export helpers (e.g. buttonVariants) next to components
  {
    files: ["app/components/ui/**"],
    rules: { "react-refresh/only-export-components": "off" },
  },
]);
