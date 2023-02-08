import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface ContextValue {
  hasError: boolean
  setError: (value: boolean) => void
}

interface ProviderProps {
  children: ReactNode
}

export const ErrorContext = createContext<ContextValue | undefined>(undefined)
ErrorContext.displayName = 'ErrorContext'

export const ErrorProvider: FC<ProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0)

  const setError = useCallback((value: boolean) => {
    setCount((count) => (value ? count + 1 : count - 1))
  }, [])

  const value = useMemo<ContextValue>(
    () => ({
      hasError: count > 0,
      setError,
    }),
    [count, setError]
  )

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

export const useErrorContext = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useErrorContext must be within ErrorContext')
  }
  return context
}

export const useErrorEffect = (value: boolean) => {
  const { setError } = useErrorContext()

  useEffect(() => {
    if (value) {
      setError(true)
      return () => setError(false)
    }
  }, [setError, value])
}
