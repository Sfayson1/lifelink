import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Root path for Render static sites
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173
  }
})
