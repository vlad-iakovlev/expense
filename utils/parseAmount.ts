export const parseAmount = (amount: string) => {
  return Math.abs(Math.round(Number(amount.replace(',', '.')) * 1e4))
}
