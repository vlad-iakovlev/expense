import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientWallet,
} from '../../types/client.ts'
import { Modify } from '../../types/utility.ts'

export interface RootStoreState {
  currencies: ClientCurrency[]
  groups: ClientGroup[]
  wallets: ClientWallet[]
  operations: ClientOperation[]
  isSyncing: boolean
  shouldSync: boolean
  syncedAt: Date | null
}

type BrowserStorageStateCurrency = ClientCurrency
type BrowserStorageStateGroup = Modify<
  ClientGroup,
  { updatedAt: string | Date }
>
type BrowserStorageStateWallet = Modify<
  ClientWallet,
  { updatedAt: string | Date }
>
type BrowserStorageStateOperation = Modify<
  ClientOperation,
  { date: string | Date; updatedAt: string | Date }
>

export interface BrowserStorageState {
  currencies: BrowserStorageStateCurrency[]
  groups: BrowserStorageStateGroup[]
  wallets: BrowserStorageStateWallet[]
  operations: BrowserStorageStateOperation[]
  syncedAt: string | Date | null
}

export enum StorageActionType {
  START_SYNC = 'START_SYNC',
  ABORT_SYNC = 'ABORT_SYNC',
  SET_STATE_FROM_REMOTE_STORAGE = 'SET_STATE_FROM_REMOTE_STORAGE',
  SET_STATE_FROM_BROWSER_STORAGE = 'SET_STATE_FROM_BROWSER_STORAGE',
  RESET_STATE = 'RESET_STATE',
}

export enum GroupsActionTypes {
  CREATE_GROUP = 'CREATE_GROUP',
  REMOVE_GROUP = 'REMOVE_GROUP',
  SET_GROUP_NAME = 'SET_GROUP_NAME',
  SET_GROUP_DEFAULT_CURRENCY = 'SET_GROUP_DEFAULT_CURRENCY',
}

export enum WalletsActionTypes {
  CREATE_WALLET = 'CREATE_WALLET',
  REMOVE_WALLET = 'REMOVE_WALLET',
  SET_WALLET_NAME = 'SET_WALLET_NAME',
  SET_WALLET_CURRENCY = 'SET_WALLET_CURRENCY',
  REORDER_WALLETS = 'REORDER_WALLETS',
}

export enum OperationsActionTypes {
  CREATE_OPERATION = 'CREATE_OPERATION',
  REMOVE_OPERATION = 'REMOVE_OPERATION',
  SET_OPERATION_NAME = 'SET_OPERATION_NAME',
  SET_OPERATION_CATEGORY = 'SET_OPERATION_CATEGORY',
  SET_OPERATION_DATE = 'SET_OPERATION_DATE',
  SET_OPERATION_TYPE = 'SET_OPERATION_TYPE',
  SET_OPERATION_INCOME_AMOUNT = 'SET_OPERATION_INCOME_AMOUNT',
  SET_OPERATION_EXPENSE_AMOUNT = 'SET_OPERATION_EXPENSE_AMOUNT',
  SET_OPERATION_INCOME_WALLET = 'SET_OPERATION_INCOME_WALLET',
  SET_OPERATION_EXPENSE_WALLET = 'SET_OPERATION_EXPENSE_WALLET',
}

export enum CategoriesActionTypes {
  RENAME_CATEGORY = 'RENAME_CATEGORY',
}
