export const walletSelect = {
  id: true,
  name: true,
  emoji: true,
  color: true,
  currency: {
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  },
}
