import { Metadata, Viewport } from 'next'
import { auth } from '@/auth.js'
import ClientRoot from '@/components/layout/ClientRoot.jsx'
import splashes from '@/splashes.json'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Expense',
  description: 'Expense Tracker',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/icons/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/icons/favicon.png',
    },
    {
      rel: 'mask-icon',
      color: '#15803d',
      url: '/icons/mask-icon.svg',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/icons/apple-touch-icon.png',
    },
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Expense',
    statusBarStyle: 'black-translucent',
    startupImage: splashes,
  },
}

export const viewport: Viewport = {
  themeColor: '#15803d',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth()

  return (
    <html lang="en">
      <body className="text-primary bg-primary touch-pan-y select-none overscroll-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]">
        <ClientRoot session={session}>{children}</ClientRoot>
      </body>
    </html>
  )
}
