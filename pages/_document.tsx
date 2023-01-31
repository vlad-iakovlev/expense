import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { FC } from 'react'

export const MyDocument: FC<DocumentProps> = () => {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <body className="bg-zinc-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
