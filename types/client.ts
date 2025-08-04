import { Decimal } from '@/utils/Decimal'

export type ClientTransaction = {
  userGroups: string[]
  groups: string[]
  wallets: string[]
  operations: string[]
}

export type ClientCurrency = {
  id: string
  symbol: string
  rate: number
}

export type PopulatedClientCurrency = {
  id: string
  symbol: string
  name: string
  fractionalDigits: number
  rate: number
}

export type ClientUser = {
  id: string
  name?: string | null
  image?: string | null
}

export type ClientUserGroup = {
  id: string
  removed: boolean
  userId: string
  groupId: string
}

export type ClientGroup = {
  id: string
  removed: boolean
  clientOnly: boolean
  clientRemoved: boolean
  name: string
  defaultCurrencyId: string
}

export type PopulatedClientGroup = {
  id: string
  clientOnly: boolean
  name: string
  defaultCurrency: PopulatedClientCurrency
}

export type ClientWallet = {
  id: string
  createdAt: Date
  removed: boolean
  name: string
  order: number | null
  currencyId: string
  groupId: string
}

export type PopulatedClientWallet = {
  id: string
  name: string
  currency: PopulatedClientCurrency
  group: PopulatedClientGroup
}

export type GroupedWallets = {
  currency: PopulatedClientCurrency
  walletIds: string[]
}

export type ClientOperation = {
  id: string
  removed: boolean
  name: string
  category: string
  date: Date
  incomeAmount: Decimal
  expenseAmount: Decimal
  incomeWalletId: string | null
  expenseWalletId: string | null
}

export enum ClientOperationType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}

export type PopulatedClientOperation = {
  id: string
  name: string
  category: string
  date: Date
  type: ClientOperationType
  incomeAmount: Decimal
  expenseAmount: Decimal
  incomeWallet: PopulatedClientWallet | null
  expenseWallet: PopulatedClientWallet | null
}

export type GroupedOperations = {
  date: Date
  operationIds: string[]
}

export type ClientBalance = {
  balance: Decimal
  currency: PopulatedClientCurrency
}

export type ClientStatisticsItem = {
  category: string
  color: string
  amount: Decimal
}

export enum ClientStatisticsType {
  INCOMES = 'INCOMES',
  EXPENSES = 'EXPENSES',
}
