import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow specific host access patterns
    allowedHosts: true,
    // Listen on all available network interfaces
    host: true,
    // Don't try alternative ports if default is in use
    strictPort: true,
    // Use standard Vite development port
    port: 5173,
    // Configure Hot Module Replacement
    hmr: {
      // Enable HMR
      overlay: true,
      // Use client hostname for websocket connection
      // This helps with "Failed to fetch" errors during ping requests
      clientPort: null,
      // Use correct protocol
      protocol: 'ws'
    }
  }
})