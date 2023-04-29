import assert from 'assert'
import { ClientWallet, PopulatedClientWallet } from '../../../types/client.ts'
import { ClientBalance } from '../../../types/client.ts'
import { RootStoreState } from '../types.tsx'
import { getCurrency } from './currencies.ts'
import { getPopulatedGroup } from './groups.ts'

interface GetWalletsParams {
  groupId?: string
}

export const getWallets = (
  state: RootStoreState,
  { groupId }: GetWalletsParams = {}
): ClientWallet[] => {
  return state.wallets
    .filter((wallet) => {
      if (wallet.removed) return false
      return !groupId || wallet.groupId === groupId
    })
    .sort((a, b) => {
      if (a.order != null && b.order != null) return a.order - b.order
      return a.name.localeCompare(b.name)
    })
}

export const getPopulatedWallet = (
  state: RootStoreState,
  walletId: string
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
  walletId: string
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
