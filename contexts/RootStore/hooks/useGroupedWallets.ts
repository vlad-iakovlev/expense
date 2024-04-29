import assert from 'assert'
import { useCallback, useMemo } from 'react'
import { ClientCurrency, ClientWallet, GroupedWallets } from '@/types/client.js'
import { getOrderedWallets } from '../getters/wallets.js'
import { useRootStore } from '../index.jsx'
import { WalletsActionTypes } from '../types.jsx'

interface Props {
  groupId?: string
}

export const useGroupedWallets = ({ groupId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const currenciesMap = useMemo(
    () =>
      state.currencies.reduce<Record<string, ClientCurrency | undefined>>(
        (acc, currency) => {
          acc[currency.id] = currency
          return acc
        },
        {},
      ),
    [state.currencies],
  )

  const groupedWallets = useMemo<GroupedWallets[]>(() => {
    const wallets = getOrderedWallets(state, { groupId })
    return groupWallets(wallets, currenciesMap)
  }, [currenciesMap, groupId, state])

  const reorderWallets = useCallback(
    (groupedWallets: GroupedWallets[]) => {
      assert(groupId, 'groupId is not defined')

      const walletIds = groupedWallets.reduce<string[]>(
        (acc, group) => [...acc, ...group.walletIds],
        [],
      )

      dispatch({
        type: WalletsActionTypes.REORDER_WALLETS,
        payload: { walletIds },
      })
    },
    [dispatch, groupId],
  )

  return {
    groupedWallets,
    reorderWallets,
  }
}

const groupWallets = (
  wallets: ClientWallet[],
  currenciesMap: Record<string, ClientCurrency | undefined>,
) =>
  wallets.reduce<GroupedWallets[]>((acc, wallet) => {
    const currency = currenciesMap[wallet.currencyId]
    assert(currency, 'Currency not found')

    let group = acc.find((group) => group.currency.id === currency.id)
    if (!group) {
      group = { currency, walletIds: [] }
      acc.push(group)
    }

    group.walletIds.push(wallet.id)

    return acc
  }, [])
