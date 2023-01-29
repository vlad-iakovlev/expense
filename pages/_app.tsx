import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import { SWRConfig } from 'swr'
import { PublicConfiguration } from 'swr/_internal'
import { Header } from '../components/Header'
import { Container } from '../components/ui-kit/Container'
import '../styles/globals.css'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
  const swrOptions = useMemo<Partial<PublicConfiguration>>(() => {
    return {
      fetcher: (url) => fetch(url).then((r) => r.json()),
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>

      <SessionProvider session={session}>
        <SWRConfig value={swrOptions}>
          <Header />
          <Container className="py-6">
            <Component {...pageProps} />
          </Container>
        </SWRConfig>
      </SessionProvider>
    </>
  )
}

export default App
