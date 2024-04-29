import React from 'react'

export const useThrowError = () => {
  const [, setState] = React.useState()

  const throwError = React.useCallback((error: unknown) => {
    setState(() => {
      throw error
    })
  }, [])

  return throwError
}
