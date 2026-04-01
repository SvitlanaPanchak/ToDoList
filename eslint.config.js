import js from "@eslint/js";
//import pluginVue from "eslint-plugin-vue";
//import skipPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import globals from "globals"; 

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, 
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-unused-vars": ["error", { "varsIgnorePattern": "^React$" }],
      "no-console": "warn",
      "react/jsx-uses-react": "error", 
      "react/jsx-uses-vars": "error",
    },
  },
];