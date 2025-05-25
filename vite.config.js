import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react';
            }
            // if (id.includes('date-fns')) {
            //   return 'date-fns';
            // }
            if (id.includes('react-route-dom')) {
              return 'react-route-dom';
            }
            if (id.includes('axios')) {
              return 'axios';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
