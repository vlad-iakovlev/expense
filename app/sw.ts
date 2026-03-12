import { defaultCache } from '@serwist/next/worker'
import {
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

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      // Exclude /api/auth/* to fix auth callback
      // https://github.com/serwist/serwist/discussions/28
      matcher: /\/api\/auth\/callback\/.*/,
      handler: new NetworkOnly(),
    },
    {
      matcher: /\/api\/auth\/.*/,
      method: 'GET',
      handler: new NetworkFirst({
        cacheName: 'apis',
        plugins: [
          new ExpirationPlugin({
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          }),
        ],
        networkTimeoutSeconds: 10, // fallback to cache if API does not response within 10 seconds
      }),
    },
    ...defaultCache,
  ],
})

serwist.addEventListeners()
