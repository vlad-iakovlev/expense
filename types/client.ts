export interface ClientUser {
  id: string
  name?: string | null
  image?: string | null
}

export interface ClientCurrency {
  id: string
  name: string
  symbol: string
  rate: number
}

export interface ClientGroup {
  id: string
  name: string
  removed: boolean
  createdAt: Date
  updatedAt: Date
  defaultCurrencyId: string
  users: ClientUser[]
}

export interface PopulatedClientGroup {
  id: string
  name: string
  defaultCurrency: ClientCurrency
  users: ClientUser[]
}

export interface ClientWallet {
  id: string
  name: string
  order: number | null
  createdAt: Date
  updatedAt: Date
  removed: boolean
  currencyId: string
  groupId: string
}

export interface PopulatedClientWallet {
  id: string
  name: string
  currency: ClientCurrency
  group: PopulatedClientGroup
}

export interface ClientOperation {
  id: string
  name: string
  category: string
  date: Date
  incomeAmount: number
  expenseAmount: number
  createdAt: Date
  updatedAt: Date
  removed: boolean
  incomeWalletId: string | null
  expenseWalletId: string | null
}

export enum ClientOperationType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}

export interface PopulatedClientOperation {
  id: string
  name: string
  category: string
  date: Date
  type: ClientOperationType
  incomeAmount: number
  expenseAmount: number
  incomeWallet: PopulatedClientWallet | null
  expenseWallet: PopulatedClientWallet | null
}

export interface ClientBalance {
  balance: number
  currency: ClientCurrency
}

export interface ClientStatisticsByCategory {
  category: string
  color: string
  incomeAmount: number
  expenseAmount: number
}
