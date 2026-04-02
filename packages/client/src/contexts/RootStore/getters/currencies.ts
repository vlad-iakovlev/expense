import { PopulatedClientCurrency } from '@/types/client'
import { RootStoreState } from '../types'

export const getPopulatedCurrency = (
  state: RootStoreState,
  currencyId: string,
): PopulatedClientCurrency => {
  const currency = state.populatedCurrencies.find(
    (currency) => currency.id === currencyId,
  )
  if (!currency) throw new Error('Currency not found')

  return currency
}

type GetDefaultCurrencyIdParams = {
  groupId?: string
  walletId?: string
}

export const getDefaultCurrencyId = (
  state: RootStoreState,
  { groupId, walletId }: GetDefaultCurrencyIdParams = {},
): string => {
  if (walletId) {
    const wallet = state.wallets.find((wallet) => wallet.id === walletId)
    if (!wallet) throw new Error('Wallet not found')
    return wallet.currencyId
  }

  if (groupId) {
    const group = state.groups.find((group) => group.id === groupId)
    if (!group) throw new Error('Group not found')
    return group.defaultCurrencyId
  }

  const currency = state.currencies.find(
    (currency) => currency.symbol === 'USD',
  )
  if (!currency) throw new Error('Currency not found')

  return currency.id
}
