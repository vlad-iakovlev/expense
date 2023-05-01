import { DocumentProps, Head, Html, Main, NextScript } from 'next/document.js'
import { FC } from 'react'
import { ApplePWA } from '../components/ApplePWA/ApplePWA.tsx'

export const MyDocument: FC<DocumentProps> = () => {
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

      <body className="bg-zinc-300 overscroll-none">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
