export const formatAmount = (amount: number): string => {
  const value = Math.abs(amount / 1e2).toFixed(2)
  return `${value}`
}
