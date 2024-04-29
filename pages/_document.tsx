import { Head, Html, Main, NextScript } from 'next/document.js'
import splashes from '@/splashes.json'

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
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="mask-icon" href="/icons/mask-icon.svg" color="#15803d" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      {splashes.map((splash) => (
        <link
          key={splash.url}
          rel="apple-touch-startup-image"
          href={splash.url}
          media={splash.media}
        />
      ))}
    </Head>

    <body className="text-primary bg-primary touch-pan-y select-none overscroll-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none]">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default MyDocument
