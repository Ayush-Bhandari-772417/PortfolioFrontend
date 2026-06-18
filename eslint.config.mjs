import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Relax a few noisy rules so we can safely iterate on UI without getting blocked.
  {
    rules: {
      // Allow legacy code using `any` in a few places.
      "@typescript-eslint/no-explicit-any": "off",

      // Avoid JSX escaping warnings in many content strings.
      "react/no-unescaped-entities": "off",

      // This repo currently triggers this rule in multiple components; disable for now.
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

