import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 5173,
    open: true
  }
});