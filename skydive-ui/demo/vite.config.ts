import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: {
    port: 5179,
    fs: {
      allow: ['..'],
    },
    open: true,
  },
})
