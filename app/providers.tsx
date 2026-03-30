'use client'

import * as fns from 'date-fns'
import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { RootStoreProvider } from '@/contexts/RootStore'

type ProvidersProps = {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
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
    <RootStoreProvider>
      <Header />
      {children}
    </RootStoreProvider>
  )
}
