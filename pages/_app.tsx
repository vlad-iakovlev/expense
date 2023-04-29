import * as fns from 'date-fns'
import 'inter-ui/inter.css'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app.js'
import { FC, useEffect } from 'react'
import { Header } from '../components/Header/Header.tsx'
import { NextHead } from '../components/next/Head.ts'
import { Container } from '../components/ui-kit/Container/Container.tsx'
import { RootStoreProvider } from '../stores/RootStore/RootStore.tsx'
import '../styles/globals.css'

const App: FC<AppProps<{ session: Session | null }>> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    fns.setDefaultOptions({ weekStartsOn: 1 })
  }, [])

  return (
    <>
      <NextHead>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </NextHead>

      <SessionProvider
        session={session}
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
      >
        <RootStoreProvider>
          <Header />
          <Container className="py-6">
            <Component {...pageProps} />
          </Container>
        </RootStoreProvider>
      </SessionProvider>
    </>
  )
}

export default App
