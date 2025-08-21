import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Vite default port
    /* setupNodeEvents(on, config) {
      // Implement node event listeners here
    }, */
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
