import currenciesInfo from '@/constants/currencies.json'
import {
  ClientCurrency,
  ClientTransaction,
  PopulatedClientCurrency,
} from '@/types/client.js'
import { RootStoreState } from './types.jsx'

export const getEmptyState = (): RootStoreState => ({
  currencies: [],
  populatedCurrencies: [],
  users: [],
  userGroups: [],
  groups: [],
  wallets: [],
  operations: [],
  disabledCategories: [],
  nextSyncTransaction: getEmptyTransaction(),
  syncingTransaction: getEmptyTransaction(),
  lastTransactionId: null,
  isSyncing: false,
  syncedAt: null,
})

export const getEmptyTransaction = (): ClientTransaction => ({
  userGroups: [],
  groups: [],
  wallets: [],
  operations: [],
})

export const mergeTransactions = (
  a: Partial<ClientTransaction>,
  b: Partial<ClientTransaction>,
): ClientTransaction => ({
  userGroups: [...(a.userGroups ?? []), ...(b.userGroups ?? [])],
  groups: [...(a.groups ?? []), ...(b.groups ?? [])],
  wallets: [...(a.wallets ?? []), ...(b.wallets ?? [])],
  operations: [...(a.operations ?? []), ...(b.operations ?? [])],
})

export const isTransactionEmpty = (transaction: ClientTransaction) =>
  transaction.userGroups.length === 0 &&
  transaction.groups.length === 0 &&
  transaction.wallets.length === 0 &&
  transaction.operations.length === 0

export const populateCurrency = (
  currency: ClientCurrency,
): PopulatedClientCurrency => {
  const currencyInfo = currenciesInfo.find(
    (currencyInfo) => currencyInfo.symbol === currency.symbol,
  )

  return {
    id: currency.id,
    symbol: currency.symbol,
    name: currencyInfo?.name ?? currency.symbol,
    // TODO: Replace 6 with something that makes sense
    fractionalDigits: currencyInfo?.fractionalDigits ?? 6,
    rate: currency.rate,
  }
}
