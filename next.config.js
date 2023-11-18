// @ts-check
import nextPWA from '@ducanh2912/next-pwa'

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: false,

  // Fix next-auth when offline
  // TODO: Add link to PR in @ducanh2912/next-pwa
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: ({ sameOrigin, url: { pathname } }) => {
          // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without having an impact on other environments
          // The above route is the default for next-auth, you may need to change it if your OAuth workflow has a different callback route
          // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
          if (!sameOrigin || pathname.startsWith('/api/auth/callback/')) {
            return false
          }

          if (pathname.startsWith('/api/')) {
            return true
          }

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
          networkTimeoutSeconds: 10, // fallback to cache if API does not response within 10 seconds
        },
      },
    ],
  },
})

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default withPWA(nextConfig)
