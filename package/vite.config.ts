import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      name: 'use-infinite-loader',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@remix-run/react'],
    },
  },

  plugins: [react()],
});
