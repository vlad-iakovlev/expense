import { useRootStore } from '..'

export const useCurrencies = () => {
  const { state } = useRootStore()

  return {
    currencies: state.populatedCurrencies,
  }
}
