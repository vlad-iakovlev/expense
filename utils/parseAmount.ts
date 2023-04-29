import { ClientCurrency } from '../types/client.ts'

export const parseAmount = (amount: string, currency: ClientCurrency) => {
  amount = amount.replace(currency.symbol, '').replace(',', '.')
  return Math.abs(Math.round(Number(amount) * 1e4))
}
