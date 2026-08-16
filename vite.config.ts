import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Port sequence across every SSD repo: 5001 admin-frontend, 5002 pos-frontend,
    // 5003 User-Service, 5004 Catalog-Service, 5005 notification-worker,
    // 5006 local-print-agent, 5007 customer-frontend.
    port: 5001,
    strictPort: true,

    // Required when reaching the dev server through a tunnel: Vite rejects
    // requests whose Host header it doesn't recognise, which is every
    // *.trycloudflare.com address.
    allowedHosts: true,

    /**
     * Forwards the API through this origin instead of the browser calling
     * User-Service directly on :5003.
     *
     * This is what makes sharing a running copy a one-tunnel job rather than
     * a two-tunnel one: the browser only ever talks to this server, so there
     * is no second public URL to expose, no cross-origin request, and
     * therefore no CORS configuration to keep in sync with whatever hostname
     * the tunnel handed out this time.
     */
    proxy: {
      '/api': { target: 'http://localhost:5003', changeOrigin: true },
      '/uploads': { target: 'http://localhost:5003', changeOrigin: true },
    },
  },
})
