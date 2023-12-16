import assert from 'assert'
import { ClientWallet, PopulatedClientWallet } from '../../../types/client.js'
import { ClientBalance } from '../../../types/client.js'
import { RootStoreState } from '../types.jsx'
import { getCurrency } from './currencies.js'
import { getPopulatedGroup } from './groups.js'

interface GetWalletsParams {
  groupId?: string
}

export const getAvailableWallets = (
  state: RootStoreState,
  { groupId }: GetWalletsParams = {},
): ClientWallet[] => {
  return state.wallets.filter((wallet) => {
    if (wallet.removed) return false
    return !groupId || wallet.groupId === groupId
  })
}

export const getOrderedWallets = (
  state: RootStoreState,
  { groupId }: GetWalletsParams = {},
): ClientWallet[] => {
  const wallets = getAvailableWallets(state, { groupId })
  return wallets.sort((a, b) => {
    if (a.order !== null && b.order !== null) return a.order - b.order
    if (a.order === null && b.order !== null) return 1
    if (a.order !== null && b.order === null) return -1
    return Number(a.createdAt) - Number(b.createdAt)
  })
}

export const getPopulatedWallet = (
  state: RootStoreState,
  walletId: string,
): PopulatedClientWallet => {
  const wallet = state.wallets.find((wallet) => wallet.id === walletId)
  assert(wallet, 'Wallet not found')

  return {
    id: wallet.id,
    name: wallet.name,
    currency: getCurrency(state, wallet.currencyId),
    group: getPopulatedGroup(state, wallet.groupId),
  }
}

export const getWalletBalance = (
  state: RootStoreState,
  walletId: string,
): ClientBalance => {
  const wallet = state.wallets.find((wallet) => wallet.id === walletId)
  assert(wallet, 'Wallet not found')

  const currency = getCurrency(state, wallet.currencyId)

  const balance = state.operations.reduce<number>((acc, operation) => {
    if (operation.removed) return acc
    if (operation.incomeWalletId === walletId) acc += operation.incomeAmount
    if (operation.expenseWalletId === walletId) acc -= operation.expenseAmount
    return acc
  }, 0)

  return {
    balance,
    currency,
  }
}
