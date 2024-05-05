import { useRootStore } from '../index.jsx'

export const useCurrencies = () => {
  const { state } = useRootStore()

  return {
    currencies: state.populatedCurrencies,
  }
}
