import { useEffect, useState } from 'react'

const getIsTabVisible = () =>
  typeof document === 'undefined' || document.visibilityState === 'visible'

export const useIsTabVisible = () => {
  const [isTabVisible, setIsTabVisibleFocused] = useState(getIsTabVisible)

  useEffect(() => {
    const update = () => {
      setIsTabVisibleFocused(getIsTabVisible())
    }

    document.addEventListener('visibilitychange', update)

    return () => {
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return isTabVisible
}
