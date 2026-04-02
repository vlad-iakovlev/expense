import { serwist } from '@serwist/vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import splashes from './generated/splashes.json' with { type: 'json' }

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      generatedRouteTree: './generated/routeTree.ts',
    }),
    react(),
    serwist({
      disable: process.env.NODE_ENV !== 'production',
      swSrc: 'src/sw.ts',
      swDest: 'sw.js',
      globDirectory: 'dist',
      globPatterns: ['**/*.{js,css,html}', 'icons/**', 'manifest.json'],
      rollupFormat: 'iife',
    }),
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
  build: {
    chunkSizeWarningLimit: 1000,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
