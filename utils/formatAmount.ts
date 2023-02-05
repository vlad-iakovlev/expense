import { ClientCurrency } from '../api/types/currencies'

export const formatAmount = (amount: number, currency: ClientCurrency) => {
  const symbol = currency.symbol
  const value = Math.abs(amount / 1e4).toFixed(2)
  return `${symbol}${value}`
}
