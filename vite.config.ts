// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  // Keep default build behaviour so bundled dependencies (comme react-intl)
  // sont correctement inclus dans le bundle final. Ne pas externaliser
  // 'react-intl' : cela causait une importation non résolue côté client.
  optimizeDeps: {
    include: ['react-intl']
  }
})
