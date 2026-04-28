import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-engine': ['jspdf', 'html-to-image'],
          'ui-icons': ['lucide-react'],
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],
          'firebase-bundle': ['firebase/app', 'firebase/auth', 'firebase/database'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
