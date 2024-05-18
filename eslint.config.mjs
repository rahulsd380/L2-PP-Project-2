import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: { globals: globals.browser },
    ignores: ["**/node_modules/", ".dist/"],
    "globals" : {"process" : "readonly"},
    rules : {
      "no-unused-vars" : "error",
      "no-undef" : "error",
      "no-console" : "warn"
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];