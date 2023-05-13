export const parseAmount = (amount: string) => {
  amount = amount.replace(/[^\d.,]/g, '').replace(',', '.')
  return Math.abs(Math.round(Number(amount) * 1e4))
}
