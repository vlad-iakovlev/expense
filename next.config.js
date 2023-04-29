import withPWA from 'next-pwa'

const nextConfig = withPWA({
  dest: 'public',
  reloadOnOnline: false,
})()

export default nextConfig
