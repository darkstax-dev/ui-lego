import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@icons/kubernetes': path.resolve(__dirname, '../src/components/icons/kubernetes'),
    },
  },
  server: {
    port: 5174,
    open: true,
  },
});
