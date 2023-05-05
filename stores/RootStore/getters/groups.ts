import assert from 'assert'
import {
  ClientBalance,
  ClientGroup,
  ClientUser,
  PopulatedClientGroup,
} from '../../../types/client.ts'
import { RootStoreState } from '../types.tsx'
import { getCurrency } from './currencies.ts'
import { getAvailableWallets, getWalletBalance } from './wallets.ts'

export const getAvailableGroups = (state: RootStoreState): ClientGroup[] => {
  return state.groups.filter((group) => !group.removed)
}

export const getOrderedGroups = (state: RootStoreState): ClientGroup[] => {
  const groups = getAvailableGroups(state)
  return groups.sort((a, b) => a.name.localeCompare(b.name))
}

export const getPopulatedGroup = (
  state: RootStoreState,
  groupId: string
): PopulatedClientGroup => {
  const group = state.groups.find((group) => group.id === groupId)
  assert(group, 'Group not found')

  return {
    id: group.id,
    name: group.name,
    defaultCurrency: getCurrency(state, group.defaultCurrencyId),
  }
}

export const getGroupBalance = (
  state: RootStoreState,
  groupId: string
): ClientBalance => {
  const group = state.groups.find((group) => group.id === groupId)
  assert(group, 'Group not found')

  const currency = getCurrency(state, group.defaultCurrencyId)

  const balance = getAvailableWallets(state, { groupId }).reduce<number>(
    (acc, wallet) => {
      const walletBalance = getWalletBalance(state, wallet.id)
      const walletBalanceInDefaultCurrency =
        walletBalance.balance * (currency.rate / walletBalance.currency.rate)

      return acc + walletBalanceInDefaultCurrency
    },
    0
  )

  return {
    balance,
    currency,
  }
}

export const getGroupUsers = (
  state: RootStoreState,
  groupId: string
): ClientUser[] => {
  return state.userGroups.reduce<ClientUser[]>((acc, userGroup) => {
    if (userGroup.groupId === groupId) {
      const user = state.users.find((user) => user.id === userGroup.userId)
      assert(user, 'User not found')
      acc.push(user)
    }

    return acc
  }, [])
}
