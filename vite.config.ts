import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ... add any additional plugins here if needed ...
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    // ... add any additional test configurations here if needed ...
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  }
})
