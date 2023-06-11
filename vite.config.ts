import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":"/src"
    }
  },
  plugins: [react({
    jsxImportSource: '@emotion/react',
  })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/theme/functions.scss";',
      },
    },
  },
})
