import { ClientCurrency } from '../api/types/currencies'

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

  const value = Math.abs(amount / 1e4).toFixed(2)
  return `${currency.symbol}${value}`
}
