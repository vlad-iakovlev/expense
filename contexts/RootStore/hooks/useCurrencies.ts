import { useRootStore } from '../index'

export const useCurrencies = () => {
  const { state } = useRootStore()

  return {
    currencies: state.populatedCurrencies,
  }
}
