import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":"/src"
    }
  },
  plugins: [
    react({
    jsxImportSource: '@emotion/react',
  }),
  VitePWA(
    {
      manifest:{  
        "name": "gita-gita-kun",  
        "short_name": "guitar",  
        "theme_color": "#16182F",  
        "background_color": "#16182F",  
        "display": "fullScreen",  
        "scope": "/",  
        "start_url": "/",
        "icons":[
          {
            "src": "icons/icon_180.png",
            "sizes": "180x180",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "icons/icon_192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "icons/icon_512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      }
    }
  )],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/theme/functions.scss";',
      },
    },
  },
})
