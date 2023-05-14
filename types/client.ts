export interface ClientTransaction {
  userGroups: string[]
  groups: string[]
  wallets: string[]
  operations: string[]
}

export interface ClientCurrency {
  id: string
  symbol: string
  name?: string | null
  rate: number
}

export interface ClientUser {
  id: string
  name?: string | null
  image?: string | null
}

export interface ClientUserGroup {
  id: string
  removed: boolean
  userId: string
  groupId: string
}

export interface ClientGroup {
  id: string
  removed: boolean
  name: string
  defaultCurrencyId: string
}

export interface PopulatedClientGroup {
  id: string
  clientOnly: boolean
  name: string
  defaultCurrency: ClientCurrency
}

export interface ClientWallet {
  id: string
  createdAt: Date
  removed: boolean
  name: string
  order: number | null
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
  removed: boolean
  name: string
  category: string
  date: Date
  incomeAmount: number
  expenseAmount: number
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

export interface ClientStatisticsItem {
  category: string
  color: string
  amount: number
}

export enum ClientStatisticsType {
  INCOMES = 'INCOMES',
  EXPENSES = 'EXPENSES',
}
