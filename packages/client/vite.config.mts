import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { Plugin, defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import splashes from './generated/splashes.json' with { type: 'json' }

const injectAppleStartupImages: Plugin = {
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
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      generatedRouteTree: './generated/routeTree.ts',
      autoCodeSplitting: true,
    }),
    react(),
    injectAppleStartupImages,
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
