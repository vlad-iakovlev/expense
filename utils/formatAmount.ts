export const formatAmount = (amount: number): string => {
  const value = Math.abs(amount / 1e4).toFixed(2)
  return `${value}`
}
