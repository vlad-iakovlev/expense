import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientTransaction,
  ClientUser,
  ClientUserGroup,
  ClientWallet,
} from '../../types/client.js'
import { Modify } from '../../types/utility.js'

export interface RootStoreState {
  currencies: ClientCurrency[]
  users: ClientUser[]
  userGroups: ClientUserGroup[]
  groups: ClientGroup[]
  wallets: ClientWallet[]
  operations: ClientOperation[]
  disabledCategories: string[]
  nextSyncTransaction: ClientTransaction
  syncingTransaction: ClientTransaction
  lastTransactionId: string | null
  isSyncing: boolean
  syncedAt: Date | null
}

export interface BrowserStorageState {
  currencies: ClientCurrency[]
  users: ClientUser[]
  userGroups: ClientUserGroup[]
  groups: ClientGroup[]
  wallets: Modify<ClientWallet, { createdAt: string }>[]
  operations: Modify<ClientOperation, { date: string }>[]
  disabledCategories?: string[]
  nextSyncTransaction: ClientTransaction
  syncingTransaction: ClientTransaction
  lastTransactionId: string | null
  syncedAt: string | null
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
  REMOVE_MEMBER_FROM_GROUP = 'REMOVE_MEMBER_FROM_GROUP',
  LEAVE_GROUP = 'LEAVE_GROUP',
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
  TOGGLE_CATEGORY = 'TOGGLE_CATEGORY',
}
