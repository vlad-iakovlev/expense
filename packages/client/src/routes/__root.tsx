import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { RootStoreProvider } from '@/contexts/RootStore'

export const Route = createRootRoute({ component: RootComponent })

function RootComponent() {
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
      <Outlet />
    </RootStoreProvider>
  )
}
