export const parseAmount = (amount: string) => {
  // Remove currency in the beginning and replace comma with dot
  amount = amount.replace(/^[^\d]*/, '').replace(',', '.')
  return Math.abs(Math.round(Number(amount) * 1e4))
}
