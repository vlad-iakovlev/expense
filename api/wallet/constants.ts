export const walletSelect = {
  id: true,
  name: true,
  group: {
    select: {
      id: true,
      name: true,
    },
  },
  currency: {
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  },
}
