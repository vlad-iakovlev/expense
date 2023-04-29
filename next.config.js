import withPWA from 'next-pwa'
import nextPWACache from 'next-pwa/cache.js'

const applyPWAConfig = withPWA({
  dest: 'public',
  reloadOnOnline: false,
  runtimeCaching: [
    {
      urlPattern: ({ url }) => {
        const isSameOrigin = self.origin === url.origin
        if (!isSameOrigin) return false
        const pathname = url.pathname
        // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without impact other environment
        // Above route is default for next-auth, you may need to change it if your OAuth workflow has a different callback route
        // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
        if (pathname.startsWith('/api/auth/callback/')) return false // <= THIS LINE IS PATCHED
        if (pathname.startsWith('/api/')) return true
        return false
      },
      handler: 'NetworkFirst',
      method: 'GET',
      options: {
        cacheName: 'apis',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10, // fall back to cache if api does not response within 10 seconds
      },
    },
    ...nextPWACache,
  ],
})

const nextConfig = applyPWAConfig({
  reactStrictMode: true,
})

export default nextConfig
