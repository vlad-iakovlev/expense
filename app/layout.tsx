import { Metadata, Viewport } from 'next'
import splashes from '@/splashes.json'
import '@/styles/globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Expense',
  description: 'Expense Tracker',
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        type: 'image/svg+xml',
        url: '/icons/favicon.svg',
      },
      {
        sizes: '32x32',
        type: 'image/png',
        url: '/icons/favicon.png',
      },
    ],
    apple: [
      {
        sizes: '180x180',
        url: '/icons/apple-touch-icon.png',
      },
    ],
    other: [
      {
        color: '#15803d',
        rel: 'mask-icon',
        url: '/icons/mask-icon.svg',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Expense',
    statusBarStyle: 'black-translucent',
    startupImage: splashes.map((splash) => ({
      media: splash.media,
      url: splash.url,
    })),
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#15803d',
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="touch-pan-y overscroll-none bg-primary-background text-primary-foreground select-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
