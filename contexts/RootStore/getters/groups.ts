import assert from 'assert'
import {
  ClientBalance,
  ClientGroup,
  ClientUser,
  PopulatedClientGroup,
} from '../../../types/client.js'
import { RootStoreState } from '../types.jsx'
import { getCurrency } from './currencies.js'
import { getAvailableWallets, getWalletBalance } from './wallets.js'

export const getAvailableGroups = (state: RootStoreState): ClientGroup[] => {
  return state.groups.filter((group) => !group.removed && !group.clientRemoved)
}

export const getOrderedGroups = (state: RootStoreState): ClientGroup[] => {
  const groups = getAvailableGroups(state)
  return groups.sort((a, b) => a.name.localeCompare(b.name))
}

export const getPopulatedGroup = (
  state: RootStoreState,
  groupId: string,
): PopulatedClientGroup => {
  const group = state.groups.find((group) => group.id === groupId)
  assert(group, 'Group not found')

  return {
    id: group.id,
    clientOnly: !!group.clientOnly,
    name: group.name,
    defaultCurrency: getCurrency(state, group.defaultCurrencyId),
  }
}

export const getGroupBalance = (
  state: RootStoreState,
  groupId: string,
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
    0,
  )

  return {
    balance,
    currency,
  }
}

export const getGroupMembers = (
  state: RootStoreState,
  groupId: string,
  me: ClientUser,
): ClientUser[] => {
  const group = state.groups.find((group) => group.id === groupId)
  assert(group, 'Group not found')
  if (group.clientOnly) return [me]

  return state.userGroups.reduce<ClientUser[]>((acc, userGroup) => {
    if (!userGroup.removed && userGroup.groupId === groupId) {
      const user = state.users.find((user) => user.id === userGroup.userId)
      assert(user, 'User not found')
      acc.push(user)
    }

    return acc
  }, [])
}
