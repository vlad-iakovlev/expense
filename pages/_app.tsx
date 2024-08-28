import * as fns from 'date-fns'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app.js'
import React from 'react'
import { ErrorBoundary } from '@/components/common/ErrorBoundary.jsx'
import { Header } from '@/components/layout/Header/index.jsx'
import { NextHead } from '@/components/next/Head.js'
import { Fallback } from '@/components/pages/Fallback.jsx'
import { RootStoreProvider } from '@/contexts/RootStore/index.jsx'
import '@/styles/globals.css'

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) => {
  React.useEffect(() => {
    fns.setDefaultOptions({ weekStartsOn: 1 })
  }, [])

  React.useEffect(() => {
    const visualViewport = window.visualViewport
    if (!visualViewport) return

    const handleResize = () => {
      document.documentElement.scrollLeft = 0
    }

    visualViewport.addEventListener('resize', handleResize)
    return () => visualViewport.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <NextHead>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </NextHead>

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
