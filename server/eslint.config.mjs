import { createRequire } from "module";
import baseConfig from "../eslint.config.mjs";
import importPlugin from "eslint-plugin-import";

const require = createRequire(import.meta.dirname);

export default [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "no-console": "off",
    },
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", // IMPORTANT
      },
    },
    rules: {
      "@typescript-eslint/no-useless-constructor": "off",
      "@typescript-eslint/no-empty-function": [
        "error",
        { allow: ["constructors"] },
      ],
    },
  },
];
