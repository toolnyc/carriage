import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["src/test/setup.ts"],
    coverage: {
      provider: "v8",
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 50,
        statements: 50,
      },
      exclude: ["node_modules/", "src/test/", "**/*.d.ts", "**/*.test.{ts,tsx}"],
    },
  },
});
