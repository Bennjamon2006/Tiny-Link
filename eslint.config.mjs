import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import pluginPrettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

const compat = new FlatCompat({
  baseDirectory: path.resolve(),
  recommendedConfig: false, // no forzar reglas por defecto
  allConfig: false,
});

export default [
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      prettier: pluginPrettier,
      import: importPlugin,
    },
    ignores: ["node_modules", "dist"],
  },
  ...compat.extends("airbnb-typescript/base"),
  ...compat.extends("prettier"),
  {
    rules: {
      "prettier/prettier": ["error"],
      "import/no-named-as-default": "off",
    },
  },
];
