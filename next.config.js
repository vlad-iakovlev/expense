// @ts-check
import nextPWA from '@ducanh2912/next-pwa'

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.jsx': ['.tsx', '.jsx'],
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['next-auth'],
}

export default withPWA(nextConfig)
