import assert from 'assert'
import {
  ClientBalance,
  ClientGroup,
  PopulatedClientGroup,
} from '../../../types/client.ts'
import { RootStoreState } from '../types.tsx'
import { getCurrency } from './currencies.ts'
import { getWalletBalance, getWallets } from './wallets.ts'

export const getGroups = (state: RootStoreState): ClientGroup[] => {
  return state.groups
    .filter((group) => !group.removed)
    .sort((a, b) => a.name.localeCompare(b.name))
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
    users: group.users,
  }
}

export const getGroupBalance = (
  state: RootStoreState,
  groupId: string
): ClientBalance => {
  const group = state.groups.find((group) => group.id === groupId)
  assert(group, 'Group not found')
  const currency = getCurrency(state, group.defaultCurrencyId)

  const balance = getWallets(state, { groupId }).reduce<number>(
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
