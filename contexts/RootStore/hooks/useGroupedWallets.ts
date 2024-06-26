import assert from 'assert'
import React from 'react'
import {
  ClientWallet,
  GroupedWallets,
  PopulatedClientCurrency,
} from '@/types/client.js'
import { getOrderedWallets } from '../getters/wallets.js'
import { useRootStore } from '../index.jsx'
import { WalletsActionTypes } from '../types.jsx'

interface UseGroupedWalletsProps {
  groupId?: string
}

export const useGroupedWallets = ({ groupId }: UseGroupedWalletsProps) => {
  const { state, dispatch } = useRootStore()

  const currenciesMap = React.useMemo(
    () =>
      state.populatedCurrencies.reduce<
        Record<string, PopulatedClientCurrency | undefined>
      >((acc, currency) => {
        acc[currency.id] = currency
        return acc
      }, {}),
    [state.populatedCurrencies],
  )

  const groupedWallets = React.useMemo<GroupedWallets[]>(() => {
    const wallets = getOrderedWallets(state, { groupId })
    return groupWallets(wallets, currenciesMap)
  }, [currenciesMap, groupId, state])

  const reorderWallets = React.useCallback(
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
  currenciesMap: Record<string, PopulatedClientCurrency | undefined>,
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
