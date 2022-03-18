import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  server: {
    host: true
  },
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true
  },
  plugins: [
    eslintPlugin(),
    react(),
  ]
})
