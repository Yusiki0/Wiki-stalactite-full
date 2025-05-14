// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // <- ici, le nom de ton repo
  plugins: [react()],
})
