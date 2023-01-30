import { ClientCurrency } from '../models/currency'

export const formatAmount = (amount: number, currency: ClientCurrency) => {
  return `${(amount / 1e4).toFixed(2)}${currency.symbol}`
}
