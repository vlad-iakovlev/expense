import withPWA from 'next-pwa'

const nextConfig = withPWA({ dest: 'public' })()

export default nextConfig
