import { DocumentProps, Head, Html, Main, NextScript } from 'next/document.js'
import { FC } from 'react'

export const MyDocument: FC<DocumentProps> = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#16a34a" />
        <meta name="theme-color" content="#16a34a" />
      </Head>

      <body className="bg-zinc-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
