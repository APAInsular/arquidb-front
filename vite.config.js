import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('date-fns')) {
              return 'date-fns';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router-dom';
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
