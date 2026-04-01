import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import splashes from './generated/splashes.json' with { type: 'json' }

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    tailwindcss(),
    {
      name: 'inject-apple-startup-images',
      transformIndexHtml: () =>
        splashes.map((splash) => ({
          tag: 'link',
          injectTo: 'head',
          attrs: {
            rel: 'apple-touch-startup-image',
            media: splash.media,
            href: splash.url,
          },
        })),
    },
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
