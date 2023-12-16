import { Head, Html, Main, NextScript } from 'next/document.js'
import { ApplePWA } from '../components/misc/ApplePWA.jsx'

export const MyDocument = () => {
  return (
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
        <meta name="theme-color" content="#16a34a" />
        <meta name="description" content="Expense Tracker" />
        <ApplePWA />
      </Head>

      <body className="touch-pan-y select-none overscroll-none bg-zinc-300 [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
