import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignore patterns
  {
    ignores: [
      "dist/**",
      "build/**",
      "target/**",
      "node_modules/**",
      "**/*.config.js",
      "tsconfig.json",
      "tsconfig.node.json",
      "src-tauri/target/**",
      "src-tauri/gen/**",
      "vite.config.ts"
    ]
  },
  // Base configuration
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  // React configuration
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    settings: {
      react: {
        version: "18.3.1"
      }
    }
  },
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off" // Not needed with React 17+
    }
  },
  // Tauri-specific rules
  {
    files: ["src-tauri/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@tauri-apps/api/*"],
              message: "Please use the Tauri API through the window.__TAURI__ object instead"
            }
          ]
        }
      ]
    }
  }
]);
