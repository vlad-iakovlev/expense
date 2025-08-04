import * as fns from 'date-fns'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { Header } from '@/components/layout/Header/index'
import { Fallback } from '@/components/pages/Fallback'
import { RootStoreProvider } from '@/contexts/RootStore/index'
import '@/styles/globals.css'

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) => {
  useEffect(() => {
    fns.setDefaultOptions({ weekStartsOn: 1 })
  }, [])

  useEffect(() => {
    const visualViewport = window.visualViewport
    if (!visualViewport) return

    const handleResize = () => {
      document.documentElement.scrollLeft = 0
    }

    visualViewport.addEventListener('resize', handleResize)
    return () => {
      visualViewport.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <SessionProvider
        session={session}
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
      >
        <RootStoreProvider>
          <Header />
          <Component {...pageProps} />
        </RootStoreProvider>
      </SessionProvider>
    </ErrorBoundary>
  )
}

export default App
