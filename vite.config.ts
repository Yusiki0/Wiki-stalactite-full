// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Wiki-stalactite-full/', // <- ici, le nom de ton repo
  plugins: [react()],
})