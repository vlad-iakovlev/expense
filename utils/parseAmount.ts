export const parseAmount = (amount: string | undefined) => {
  return Math.round(Number(amount?.replace(',', '.')) * 1e4)
}
