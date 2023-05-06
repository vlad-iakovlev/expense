import { ClientTransaction } from '../../types/client.ts'
import { MayBeFn } from '../../types/utility.ts'
import { RootStoreState } from './types.tsx'

export const createInState = <
  Scope extends 'userGroups' | 'groups' | 'wallets' | 'operations'
>(
  state: RootStoreState,
  scope: Scope,
  data: Omit<RootStoreState[Scope][number], 'removed'>
): RootStoreState => {
  return {
    ...state,
    [scope]: [
      ...state[scope],
      {
        ...data,
        removed: false,
      },
    ],
    nextSyncTransaction: {
      ...state.nextSyncTransaction,
      [scope]: [...state.nextSyncTransaction[scope], data.id],
    },
  }
}

export const updateInState = <
  Scope extends 'userGroups' | 'groups' | 'wallets' | 'operations'
>(
  state: RootStoreState,
  scope: Scope,
  id: string,
  data: MayBeFn<
    [RootStoreState[Scope][number]],
    Partial<Omit<RootStoreState[Scope][number], 'id'>>
  >
): RootStoreState => {
  const getData = typeof data === 'function' ? data : () => data

  return {
    ...state,
    [scope]: state[scope].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...getData(item),
        }
      }

      return item
    }),
    nextSyncTransaction: {
      ...state.nextSyncTransaction,
      [scope]: [...state.nextSyncTransaction[scope], id],
    },
  }
}

export const getEmptyState = (): RootStoreState => ({
  currencies: [],
  users: [],
  userGroups: [],
  groups: [],
  wallets: [],
  operations: [],
  nextSyncTransaction: getEmptyTransaction(),
  syncingTransaction: getEmptyTransaction(),
  lastTransactionId: null,
  syncedAt: null,
})

export const getEmptyTransaction = (): ClientTransaction => ({
  userGroups: [],
  groups: [],
  wallets: [],
  operations: [],
})

export const mergeTransactions = (
  a: ClientTransaction,
  b: ClientTransaction
): ClientTransaction => ({
  userGroups: [...a.userGroups, ...b.userGroups],
  groups: [...a.groups, ...b.groups],
  wallets: [...a.wallets, ...b.wallets],
  operations: [...a.operations, ...b.operations],
})

export const isTransactionEmpty = (transaction: ClientTransaction) => {
  return (
    transaction.groups.length === 0 &&
    transaction.wallets.length === 0 &&
    transaction.operations.length === 0
  )
}
