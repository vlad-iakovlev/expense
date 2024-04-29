import React from 'react'

const getIsTabVisible = () =>
  typeof document === 'undefined' || document.visibilityState === 'visible'

export const useIsTabVisible = () => {
  const [isTabVisible, setIsTabVisibleFocused] = React.useState(getIsTabVisible)

  React.useEffect(() => {
    const update = () => setIsTabVisibleFocused(getIsTabVisible())

    document.addEventListener('visibilitychange', update)

    return () => {
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return isTabVisible
}
