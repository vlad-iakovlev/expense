import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface ContextValue {
  isLoading: boolean
  setLoading: (value: boolean) => void
}

interface ProviderProps {
  children: ReactNode
}

export const LoadingContext = createContext<ContextValue | undefined>(undefined)
LoadingContext.displayName = 'LoadingContext'

export const LoadingProvider: FC<ProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0)

  const setLoading = useCallback((value: boolean) => {
    setCount((count) => (value ? count + 1 : count - 1))
  }, [])

  const value = useMemo<ContextValue>(
    () => ({
      isLoading: count > 0,
      setLoading,
    }),
    [count, setLoading]
  )

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  )
}

export const useLoadingContext = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoadingContext must be within LoadingProvider')
  }
  return context
}

export const useLoadingEffect = (value: boolean) => {
  const { setLoading } = useLoadingContext()

  useEffect(() => {
    if (value) {
      setLoading(true)
      return () => setLoading(false)
    }
  }, [setLoading, value])
}
