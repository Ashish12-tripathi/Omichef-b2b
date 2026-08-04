import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    // Allow the Vite website to open on other devices on the same network.
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,

    // Send frontend /api requests to the Express backend.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true
  }
});