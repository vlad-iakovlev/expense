// @ts-check
import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
  disable: process.env.NODE_ENV === 'development',
  reloadOnOnline: false,
  swDest: 'public/sw.js',
  swSrc: 'app/sw.ts',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default withSerwist(nextConfig)
