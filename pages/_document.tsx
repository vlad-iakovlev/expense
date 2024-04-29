import { Head, Html, Main, NextScript } from 'next/document.js'
import { ApplePWA } from '@/components/layout/ApplePWA.jsx'

export const MyDocument = () => (
  <Html lang="en">
    <Head>
      <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#15803d" />
      <meta name="description" content="Expense Tracker" />
      <ApplePWA />
    </Head>

    <body className="text-primary bg-primary touch-pan-y select-none overscroll-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default MyDocument
