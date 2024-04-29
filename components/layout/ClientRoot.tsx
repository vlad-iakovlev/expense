'use client'

import * as fns from 'date-fns'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ErrorBoundary } from '@/components/common/ErrorBoundary.jsx'
import { Fallback } from '@/components/pages/Fallback.jsx'
import { RootStoreProvider } from '@/contexts/RootStore/index.jsx'
import { Header } from './Header/index.jsx'

fns.setDefaultOptions({ weekStartsOn: 1 })

interface ClientRootProps {
  session: Session | null
  children: React.ReactNode
}

export default function ClientRoot({ session, children }: ClientRootProps) {
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
    </ErrorBoundary>
  )
}
