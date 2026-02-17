import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Already enabled via CLI, but good to have here
        headers: {
            'X-Frame-Options': 'ALLOWALL', // For older browsers/tools
            'Content-Security-Policy': "frame-ancestors *", // Modern way to allow embedding
        },
        allowedHosts: true, // Allow all hosts (tunnels)
    },
    preview: {
        host: true,
        allowedHosts: true,
        headers: {
            'X-Frame-Options': 'ALLOWALL',
            'Content-Security-Policy': "frame-ancestors *",
        },
    }
})
