import { ClientCurrency } from '../api/types/currencies'

export const formatAmount = (amount: number, currency: ClientCurrency) => {
  return `${currency.symbol}${(amount / 1e4).toFixed(2)}`
}
