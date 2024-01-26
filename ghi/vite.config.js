import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        strictPort: true,
    },
    resolve: {
        alias: {
            'react-router-dom': 'react-router-dom@6',
        },
    },
})
