import assert from 'assert'
import { PopulatedClientCurrency } from '@/types/client.js'
import { RootStoreState } from '../types.jsx'

export const getPopulatedCurrency = (
  state: RootStoreState,
  currencyId: string,
): PopulatedClientCurrency => {
  const currency = state.populatedCurrencies.find(
    (currency) => currency.id === currencyId,
  )
  assert(currency, 'Currency not found')

  return currency
}

interface GetDefaultCurrencyIdParams {
  groupId?: string
  walletId?: string
}

export const getDefaultCurrencyId = (
  state: RootStoreState,
  { groupId, walletId }: GetDefaultCurrencyIdParams = {},
): string => {
  if (walletId) {
    const wallet = state.wallets.find((wallet) => wallet.id === walletId)
    assert(wallet, 'Wallet not found')
    return wallet.currencyId
  }

  if (groupId) {
    const group = state.groups.find((group) => group.id === groupId)
    assert(group, 'Group not found')
    return group.defaultCurrencyId
  }

  const currency = state.currencies.find(
    (currency) => currency.symbol === 'USD',
  )
  assert(currency, 'Currency not found')
  return currency.id
}
