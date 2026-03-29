'use client'

import * as fns from 'date-fns'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { RootStoreProvider } from '@/contexts/RootStore'

type ProvidersProps = {
  children: React.ReactNode
  session?: Session | null
}

export const Providers = ({ children, session = null }: ProvidersProps) => {
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
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      <RootStoreProvider>
        <Header />
        {children}
      </RootStoreProvider>
    </SessionProvider>
  )
}
