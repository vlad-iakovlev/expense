import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'
import { getCurrencies } from '../../api/client/currencies'
import { ClientCurrency } from '../../api/types/currencies'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  currencies: ClientCurrency[]
}

interface ProviderProps {
  children: ReactNode
}

export const CurrenciesContext = createContext<ContextValue | undefined>(
  undefined
)

export const CurrenciesProvider: FC<ProviderProps> = ({ children }) => {
  const { data, isLoading } = useSWR(
    SWR_KEYS.CURRENCIES(),
    useCallback(() => getCurrencies(), [])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        currencies: data.currencies,
      },
    [data]
  )

  return (
    <Fallback isLoading={isLoading} data={value}>
      <CurrenciesContext.Provider value={value}>
        {children}
      </CurrenciesContext.Provider>
    </Fallback>
  )
}

export const useCurrenciesContext = () => {
  const context = useContext(CurrenciesContext)
  if (!context) {
    throw new Error('useCurrenciesContext must be within CurrenciesProvider')
  }
  return context
}
