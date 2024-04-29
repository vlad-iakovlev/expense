import assert from 'assert'
import { ClientCurrency } from '@/types/client.js'
import { RootStoreState } from '../types.jsx'

export const getCurrency = (
  state: RootStoreState,
  currencyId: string,
): ClientCurrency => {
  const currency = state.currencies.find(
    (currency) => currency.id === currencyId,
  )
  assert(currency, 'Currency not found')

  return currency
}

interface GetDefaultCurrencyParams {
  groupId?: string
  walletId?: string
}

export const getDefaultCurrency = (
  state: RootStoreState,
  { groupId, walletId }: GetDefaultCurrencyParams = {},
): ClientCurrency => {
  if (walletId) {
    const wallet = state.wallets.find((wallet) => wallet.id === walletId)
    assert(wallet, 'Wallet not found')
    return getCurrency(state, wallet.currencyId)
  }

  if (groupId) {
    const group = state.groups.find((group) => group.id === groupId)
    assert(group, 'Group not found')
    return getCurrency(state, group.defaultCurrencyId)
  }

  const currency = state.currencies.find(
    (currency) => currency.symbol === 'USD',
  )
  assert(currency, 'Currency not found')
  return currency
}
