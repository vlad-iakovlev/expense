import {
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  NetworkOnly,
  PrecacheEntry,
  Serwist,
  SerwistGlobalConfig,
  StaleWhileRevalidate,
} from 'serwist'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching:
    process.env.NODE_ENV === 'production'
      ? [
          {
            matcher: /\/_next\/static.+$/i,
            handler: new CacheFirst({
              cacheName: 'next-static-assets',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: /\/_next\/data\/.+$/i,
            handler: new NetworkFirst({
              cacheName: 'next-data',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: /\/_next\/image\?url=.+$/i,
            handler: new StaleWhileRevalidate({
              cacheName: 'next-image',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: /\.(?:json|xml|csv)$/i,
            handler: new NetworkFirst({
              cacheName: 'static-data-assets',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            handler: new StaleWhileRevalidate({
              cacheName: 'static-image-assets',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            // Exclude /api/auth/callback/* to fix auth callback
            // https://github.com/serwist/serwist/discussions/28
            matcher: /\/api\/auth\/callback\/.*/,
            handler: new NetworkOnly(),
          },
          {
            matcher: /\/api\/auth\/.*/,
            handler: new NetworkFirst({
              cacheName: 'apis',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: ({ request, url: { pathname }, sameOrigin }) =>
              request.headers.get('RSC') === '1' &&
              request.headers.get('Next-Router-Prefetch') === '1' &&
              sameOrigin &&
              !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
              cacheName: 'pages-rsc-prefetch',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: ({ request, url: { pathname }, sameOrigin }) =>
              request.headers.get('RSC') === '1' &&
              sameOrigin &&
              !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
              cacheName: 'pages-rsc',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: ({ request, url: { pathname }, sameOrigin }) =>
              request.headers.get('Content-Type')?.includes('text/html') &&
              sameOrigin &&
              !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
              cacheName: 'pages',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: ({ url: { pathname }, sameOrigin }) =>
              sameOrigin && !pathname.startsWith('/api/'),
            handler: new NetworkFirst({
              cacheName: 'others',
              plugins: [
                new ExpirationPlugin({
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                  maxAgeFrom: 'last-used',
                }),
              ],
            }),
          },
          {
            matcher: /.*/i,
            handler: new NetworkOnly(),
          },
        ]
      : [
          {
            matcher: /.*/i,
            handler: new NetworkOnly(),
          },
        ],
})

serwist.addEventListeners()
