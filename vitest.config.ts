import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    env: {
      VITE_API_URL: "http://test-url.com",
      VITE_SESSION_ID: "test-2"
    },
    setupFiles: ["./src/tests/setup.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    headers: {
      "Service-Worker-Allowed": "/"
    }
  }
});
