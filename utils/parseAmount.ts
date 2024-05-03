export const parseAmount = (amount: string) =>
  Math.abs(Number(amount.replace(',', '.')))
