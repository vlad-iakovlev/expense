export const formatPercent = (value: number) => {
  if (value === 0) return '0%'

  const percent = value * 100
  if (percent < 0.01) return '<0.01%'

  return `${percent.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}%`
}
