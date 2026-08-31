import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: ['thunderflowfrontend.up.railway.app'],
  },

  preview: {
    allowedHosts: ['thunderflowfrontend.up.railway.app'],
  },
})