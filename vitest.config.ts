/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'



export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    testTimeout: 15_000,
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
    environment: 'happy-dom',
    setupFiles: ['./__tests__/utils/vitest.setup.ts'],
  },
})