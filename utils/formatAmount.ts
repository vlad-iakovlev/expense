import { ClientCurrency } from '../api/types/currencies'

export const formatAmount = (amount: number, currency: ClientCurrency) => {
  return `${(amount / 1e4).toFixed(2)}${currency.symbol}`
}
