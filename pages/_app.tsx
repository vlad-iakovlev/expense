import * as fns from 'date-fns'
import { AnimatePresence } from 'framer-motion'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app.js'
import { useRouter } from 'next/router.js'
import { FC, useEffect } from 'react'
import { Header } from '../components/Header/Header.tsx'
import { NextHead } from '../components/ui-kit/NextHead/NextHead.ts'
import { RootStoreProvider } from '../stores/RootStore/RootStore.tsx'
import '../styles/globals.css'

const App: FC<AppProps<{ session: Session | null }>> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter()

  useEffect(() => {
    fns.setDefaultOptions({ weekStartsOn: 1 })
  }, [])

  return (
    <>
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
          <AnimatePresence
            initial={false}
            mode="popLayout"
            custom={router.query.animation}
          >
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
        </RootStoreProvider>
      </SessionProvider>
    </>
  )
}

export default App
