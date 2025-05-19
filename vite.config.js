import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";
import { manifestForPlugIn } from './manifest';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA(manifestForPlugIn)
  ],
})
