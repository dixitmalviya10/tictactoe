import type { VitePWAOptions } from "vite-plugin-pwa";

export const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon.png"],
  manifest: {
    name: "Tic Tac Toe",
    short_name: "Tic Tac Toe",
    description: "I am a tic-tac-toe app",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#020617",
    background_color: "#020617",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
