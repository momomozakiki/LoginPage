module.exports = {
  presets: [
    "@babel/preset-env", // Transpile modern JavaScript to a compatible version for target environments
    "@babel/preset-react", // Enable JSX transformation
    "@babel/preset-typescript", // Enable TypeScript support
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Reduce code duplication by reusing Babel helpers
  ],
};