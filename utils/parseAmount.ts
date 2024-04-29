export const parseAmount = (amount: string) =>
  Math.abs(Math.round(Number(amount.replace(',', '.')) * 1e2))
