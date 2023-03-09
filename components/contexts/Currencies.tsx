import { createContext, FC, ReactNode } from 'react'
import { getCurrencies } from '../../api/client/currencies'
import { GetCurrenciesResponse } from '../../api/types/currencies'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetCurrenciesResponse, undefined>

interface ProviderProps {
  children: ReactNode
}

export const CurrenciesContext = createContext<ContextValue | undefined>(
  undefined
)
CurrenciesContext.displayName = 'CurrenciesContext'

export const CurrenciesProvider: FC<ProviderProps> = ({ children }) => {
  const value = useSwrValue('currencies', getCurrencies, undefined, undefined)

  return (
    <CurrenciesContext.Provider value={value}>
      {children}
    </CurrenciesContext.Provider>
  )
}

export const useCurrenciesContext = () => {
  const context = useSwrContext(CurrenciesContext)

  return {
    currenciesResponse: context.response,
    mutateCurrencies: context.mutate,
  }
}
