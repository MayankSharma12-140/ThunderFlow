import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: ['alluring-commitment-production-2e6f.up.railway.app'],
  },

  preview: {
    allowedHosts: ['alluring-commitment-production-2e6f.up.railway.app'],
  },
})