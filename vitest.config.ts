import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Required for React component testing
    setupFiles: ["./vitest.setup.ts"], // Setup file for jest-dom
    globals: true, // Enables Jest-like globals (e.g., describe, test)
  },
});
