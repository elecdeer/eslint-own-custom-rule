import eslint from "@eslint/js";
import prettierConfigPlugin from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

// import * as myRule from "./rules/index.mjs";
import * as myRule from "./rules/dist/index.cjs";

export default typescriptEslint.config(
  {
    ignores: [
      "dist",
      "eslint.config.mjs",
      "vite.config.ts",
      "eslint-local-rules.cjs",
    ],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.es2020,
        ...globals.browser,
      },
    },
  },
  ...typescriptEslint.configs.recommendedTypeChecked,
  ...typescriptEslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  // {
  //   plugins: {
  //     "local-rules": localRules,
  //   },
  //   rules: {
  //     "local-rules/no-omit-utility-type": "error",
  //   },
  // },
  {
    plugins: {
      "local-rules": myRule,
    },
    rules: {
      "local-rules/no-omit-utility-type": "error",
      "local-rules/no-hr-element": "error",
    },
  },
  prettierConfigPlugin,
);
