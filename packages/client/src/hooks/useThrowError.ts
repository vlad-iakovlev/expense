import { useCallback, useState } from 'react'

export const useThrowError = () => {
  // eslint-disable-next-line @eslint-react/use-state
  const [, setState] = useState()

  const throwError = useCallback((error: unknown) => {
    setState(() => {
      throw error
    })
  }, [])

  return throwError
}
