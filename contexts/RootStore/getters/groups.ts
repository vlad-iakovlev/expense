import assert from 'assert'
import {
  ClientBalance,
  ClientGroup,
  ClientUser,
  PopulatedClientGroup,
} from '@/types/client.js'
import { Decimal } from '@/utils/Decimal.js'
import { RootStoreState } from '../types.jsx'
import { getPopulatedCurrency } from './currencies.js'
import { getAvailableWallets, getWalletBalance } from './wallets.js'

export const getAvailableGroups = (state: RootStoreState): ClientGroup[] =>
  state.groups.filter((group) => !group.removed && !group.clientRemoved)

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
    defaultCurrency: getPopulatedCurrency(state, group.defaultCurrencyId),
  }
}

export const getGroupBalance = (
  state: RootStoreState,
  groupId: string,
): ClientBalance => {
  const group = state.groups.find((group) => group.id === groupId)
  assert(group, 'Group not found')

  const currency = getPopulatedCurrency(state, group.defaultCurrencyId)

  const balance = getAvailableWallets(state, { groupId }).reduce(
    (acc, wallet) => {
      const walletBalance = getWalletBalance(state, wallet.id)
      const walletBalanceInDefaultCurrency = walletBalance.balance.mul(
        Decimal.fromNumber(currency.rate / walletBalance.currency.rate),
      )

      return acc.add(walletBalanceInDefaultCurrency)
    },
    Decimal.ZERO,
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
