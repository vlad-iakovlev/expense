export const formatPercent = (value: number) =>
  `${(value * 100).toFixed(2).replace(/\.?0+$/, '')}%`
