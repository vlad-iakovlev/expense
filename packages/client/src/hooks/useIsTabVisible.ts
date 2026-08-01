import { useEffect, useState } from 'react'

const getIsTabVisible = () =>
  typeof document === 'undefined' || document.visibilityState === 'visible'

export const useIsTabVisible = () => {
  const [isTabVisible, setIsTabVisible] = useState(() => getIsTabVisible())

  useEffect(() => {
    const update = () => {
      setIsTabVisible(getIsTabVisible())
    }

    document.addEventListener('visibilitychange', update)

    return () => {
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return isTabVisible
}
