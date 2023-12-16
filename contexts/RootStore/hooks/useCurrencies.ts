import { useRootStore } from '../RootStore.jsx'

export const useCurrencies = () => {
  const { state } = useRootStore()

  return {
    currencies: state.currencies,
  }
}
