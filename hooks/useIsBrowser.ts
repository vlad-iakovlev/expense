import React from 'react'

export const useIsBrowser = () => {
  const [isBrowser, setIsBrowser] = React.useState(false)

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  return isBrowser
}
