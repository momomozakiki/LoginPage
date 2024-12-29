module.exports = {
  env: {
    browser: true, // Enable browser globals (e.g., `window`, `document`)
    es2021: true, // Use ES2021 features (e.g., `Promise.allSettled`)
  },
  extends: [
    "eslint:recommended", // Use recommended ESLint rules
    "plugin:react/recommended", // Use recommended React rules
    "plugin:@typescript-eslint/recommended", // Use recommended TypeScript rules
  ],
  parser: "@typescript-eslint/parser", // Use TypeScript parser to parse `.tsx` files
  parserOptions: {
    ecmaVersion: 12, // Use ES2021 syntax
    sourceType: "module", // Use ES modules (import/export)
    ecmaFeatures: {
      jsx: true, // Enable JSX syntax
    },
  },
  plugins: [
    "react", // Enable React-specific linting rules
    "@typescript-eslint", // Enable TypeScript-specific linting rules
    "react-hooks", // Enable React Hooks linting rules
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Disable React in scope requirement (not needed for React 17+)
    "react-hooks/rules-of-hooks": "error", // Enforce React Hooks rules (e.g., don't call hooks conditionally)
    "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in `useEffect` or `useMemo`
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};