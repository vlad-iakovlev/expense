export const currencySelector = {
  id: true,
  name: true,
  symbol: true,
  rate: true,
}

export const userSelector = {
  id: true,
  image: true,
  name: true,
}

export const groupSelector = {
  id: true,
  name: true,
  defaultCurrency: { select: currencySelector },
  users: { select: userSelector },
}

export const walletSelector = {
  id: true,
  name: true,
  currency: { select: currencySelector },
  group: { select: groupSelector },
}

export const operationSelector = {
  id: true,
  name: true,
  category: true,
  date: true,
  incomeAmount: true,
  expenseAmount: true,
  incomeWallet: { select: walletSelector },
  expenseWallet: { select: walletSelector },
}
