import 'inter-ui/inter.css'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app.js'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { Header } from '../components/Header/Header.tsx'
import { NextHead } from '../components/next/Head.ts'
import { Container } from '../components/ui-kit/Container/Container.tsx'
import '../styles/globals.css'

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
  useEffect(() => {
    void (async () => {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
          await registration.unregister()
        }
      }
    })()
  }, [])

  return (
    <>
      <NextHead>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </NextHead>

      <SessionProvider session={session}>
        <SWRConfig
          value={{
            dedupingInterval: 0,
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
