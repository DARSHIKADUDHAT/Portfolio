import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Default dev server configured to listen on port 5174 and bind to all interfaces.
// Override via CLI: `npm run dev -- --port 5173` or `npm run dev -- --host`
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true
  }
})
