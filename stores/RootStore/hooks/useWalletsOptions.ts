import assert from 'assert'
import { useMemo } from 'react'
import { ClientCurrency } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getSortedWallets } from '../getters/wallets.ts'

interface Props {
  groupId?: string
}

export const useWalletsOptions = ({ groupId }: Props = {}) => {
  const { state } = useRootStore()

  const walletsOptions = useMemo(() => {
    const currenciesMap = state.currencies.reduce<
      Record<string, ClientCurrency | undefined>
    >((acc, currency) => {
      acc[currency.id] = currency
      return acc
    }, {})

    return getSortedWallets(state, { groupId }).map((wallet) => {
      const currency = currenciesMap[wallet.currencyId]
      assert(currency, 'Currency not found')

      return {
        id: wallet.id,
        name: `${wallet.name} ${currency.name}`,
      }
    })
  }, [groupId, state])

  return {
    walletsOptions,
  }
}
