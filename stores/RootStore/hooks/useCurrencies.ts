import { useMemo } from 'react'
import { ClientCurrency } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getCurrencies } from '../getters/currencies.ts'

export const useCurrencies = () => {
  const { state } = useRootStore()

  const currencies = useMemo<ClientCurrency[]>(
    () => getCurrencies(state),
    [state]
  )

  return {
    currencies,
  }
}
