import React from 'react'

const getIsOnline = () =>
  typeof window === 'undefined' ||
  typeof navigator === 'undefined' ||
  !!window.navigator.onLine

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = React.useState(getIsOnline())

  React.useEffect(() => {
    const update = () => setIsOnline(getIsOnline())

    window.addEventListener('online', update)
    window.addEventListener('offline', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  return isOnline
}
