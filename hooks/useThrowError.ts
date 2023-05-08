import { useCallback, useState } from 'react'

export const useThrowError = () => {
  const [, setState] = useState()

  const throwError = useCallback((error: unknown) => {
    setState(() => {
      throw error
    })
  }, [])

  return throwError
}
