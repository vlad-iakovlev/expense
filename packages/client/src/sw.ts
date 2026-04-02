/// <reference lib="WebWorker" />
import {
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  NetworkOnly,
  PrecacheEntry,
  Serwist,
  SerwistGlobalConfig,
} from 'serwist'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const SECONDS_IN_MONTH = 30 * 24 * 60 * 60

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  precacheOptions: {
    navigateFallback: '/index.html',
  },
  runtimeCaching: [
    {
      matcher: ({ sameOrigin, url }) =>
        sameOrigin && url.pathname === '/api/auth/get-session',
      handler: new NetworkFirst({
        cacheName: 'auth-api',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: SECONDS_IN_MONTH,
            maxAgeFrom: 'last-used',
          }),
        ],
      }),
    },
    {
      matcher: ({ url }) => url.hostname === 'lh3.googleusercontent.com',
      handler: new CacheFirst({
        cacheName: 'google-avatars',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: SECONDS_IN_MONTH,
            maxAgeFrom: 'last-used',
          }),
        ],
      }),
    },
    {
      matcher: /.*/i,
      handler: new NetworkOnly(),
    },
  ],
})

serwist.addEventListeners()
