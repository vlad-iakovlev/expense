import { ClientCurrency } from '../types/client.ts'

export const formatAmount = (
  amount: number,
  currency: ClientCurrency,
  displayCurrency?: ClientCurrency
): string => {
  if (displayCurrency) {
    return `~${formatAmount(
      amount * (displayCurrency.rate / currency.rate),
      displayCurrency
    )}`
  }

  // In case symbol is not defined, use name with extra space
  const symbol = currency.symbol ?? currency.name + ' '
  const value = Math.abs(amount / 1e4).toFixed(2)
  return `${symbol}${value}`
}
