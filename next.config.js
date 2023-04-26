import withPWA from 'next-pwa'

const nextConfig = withPWA({ dest: 'public', disable: true })()

export default nextConfig
