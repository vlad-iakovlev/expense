import { useRootStore } from '../RootStore.tsx'

export const useCurrencies = () => {
  const { state } = useRootStore()

  return {
    currencies: state.currencies,
  }
}
