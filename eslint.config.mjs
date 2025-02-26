import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "eslint-disable @typescript-eslint/no-explicit-any": "off",
      "eslint-disable no-constant-condition": "off",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
