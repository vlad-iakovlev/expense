export const walletSelect = {
  id: true,
  name: true,
  currency: {
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  },
}
