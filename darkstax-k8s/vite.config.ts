import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@icons': path.resolve(__dirname, '../src/components/icons'),
      '@icons/kubernetes': path.resolve(__dirname, '../src/components/icons/kubernetes'),
      // Use ui-lego source directly (no need to build dist in this workspace)
      'ui-lego': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    port: 5174,
    open: false,
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
});
