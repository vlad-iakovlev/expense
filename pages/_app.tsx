import 'inter-ui/inter.css'
import '../styles/globals.css'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Container } from '../components/ui-kit/Container'
import { SWRConfig } from 'swr'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>

      <SessionProvider session={session}>
        <SWRConfig
          value={{
            dedupingInterval: 0,
            focusThrottleInterval: 60000,
          }}
        >
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
