import assert from 'assert'
import { ClientWallet, PopulatedClientWallet } from '@/types/client'
import { ClientBalance } from '@/types/client'
import { Decimal } from '@/utils/Decimal'
import { RootStoreState } from '../types'
import { getPopulatedCurrency } from './currencies'
import { getPopulatedGroup } from './groups'

type GetWalletsParams = {
  groupId?: string
}

export const getAvailableWallets = (
  state: RootStoreState,
  { groupId }: GetWalletsParams = {},
): ClientWallet[] =>
  state.wallets.filter((wallet) => {
    if (wallet.removed) return false
    return !groupId || wallet.groupId === groupId
  })

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
    currency: getPopulatedCurrency(state, wallet.currencyId),
    group: getPopulatedGroup(state, wallet.groupId),
  }
}

export const getWalletBalance = (
  state: RootStoreState,
  walletId: string,
): ClientBalance => {
  const wallet = state.wallets.find((wallet) => wallet.id === walletId)
  assert(wallet, 'Wallet not found')

  const currency = getPopulatedCurrency(state, wallet.currencyId)

  const balance = state.operations.reduce((acc, operation) => {
    if (!operation.removed && operation.incomeWalletId === walletId) {
      return acc.add(operation.incomeAmount)
    }

    if (!operation.removed && operation.expenseWalletId === walletId) {
      return acc.sub(operation.expenseAmount)
    }

    return acc
  }, Decimal.ZERO)

  return {
    balance,
    currency,
  }
}
