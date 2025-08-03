import { Decimal } from '@/utils/Decimal'

export interface ClientTransaction {
  userGroups: string[]
  groups: string[]
  wallets: string[]
  operations: string[]
}

export interface ClientCurrency {
  id: string
  symbol: string
  rate: number
}

export interface PopulatedClientCurrency {
  id: string
  symbol: string
  name: string
  fractionalDigits: number
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
  clientOnly: boolean
  clientRemoved: boolean
  name: string
  defaultCurrencyId: string
}

export interface PopulatedClientGroup {
  id: string
  clientOnly: boolean
  name: string
  defaultCurrency: PopulatedClientCurrency
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
  currency: PopulatedClientCurrency
  group: PopulatedClientGroup
}

export interface GroupedWallets {
  currency: PopulatedClientCurrency
  walletIds: string[]
}

export interface ClientOperation {
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

export interface PopulatedClientOperation {
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

export interface GroupedOperations {
  date: Date
  operationIds: string[]
}

export interface ClientBalance {
  balance: Decimal
  currency: PopulatedClientCurrency
}

export interface ClientStatisticsItem {
  category: string
  color: string
  amount: Decimal
}

export enum ClientStatisticsType {
  INCOMES = 'INCOMES',
  EXPENSES = 'EXPENSES',
}
