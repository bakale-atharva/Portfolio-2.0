import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/*", "node_modules/*", "out/*", "coverage/*", "playwright-report/*", "e2e/*"],
  },
];

export default eslintConfig;
