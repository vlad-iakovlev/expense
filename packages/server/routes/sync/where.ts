import { Transaction } from '@expense/prisma'
import { Modify } from '@/types/utility.js'

const getUnifiedSyncWhere = <
  AuthorizationOr extends unknown[],
  TransactionOr extends unknown[],
>(params: {
  id?: string
  removed?: boolean
  authorizationOr?: AuthorizationOr
  transactionOr?: TransactionOr
}) => ({
  id: params.id,
  removed: params.removed,
  AND: [
    ...(params.authorizationOr ? [{ OR: params.authorizationOr }] : []),
    ...(params.transactionOr ? [{ OR: params.transactionOr }] : []),
  ],
})

const getChangedSinceLastSyncWhere = (params: {
  clientTransaction: Modify<Transaction, { completedAt: Date }>
}) => ({
  transactions: {
    some: { completedAt: { gt: params.clientTransaction.completedAt } },
  },
})

const getGroupNewMembershipSinceLastSyncWhere = (params: {
  userId: string
  clientTransaction: Modify<Transaction, { completedAt: Date }>
}) => ({
  userGroups: {
    some: {
      removed: false,
      userId: params.userId,
      ...getChangedSinceLastSyncWhere({
        clientTransaction: params.clientTransaction,
      }),
    },
  },
})

export const getGroupWhere = (params: {
  userId: string
  groupId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) =>
  getUnifiedSyncWhere({
    id: params.groupId,
    removed: params.removed,
    authorizationOr: [
      {
        userGroups: {
          some: {
            removed: false,
            userId: params.userId,
          },
        },
      },
    ],
    transactionOr: params.clientTransaction && [
      getChangedSinceLastSyncWhere({
        clientTransaction: params.clientTransaction,
      }),
      getGroupNewMembershipSinceLastSyncWhere({
        userId: params.userId,
        clientTransaction: params.clientTransaction,
      }),
    ],
  })

export const getUserGroupWhere = (params: {
  userId: string
  userGroupId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) =>
  getUnifiedSyncWhere({
    id: params.userGroupId,
    removed: params.removed,
    authorizationOr: [
      { userId: params.userId },
      { group: getGroupWhere({ userId: params.userId }) },
    ],
    transactionOr: params.clientTransaction && [
      getChangedSinceLastSyncWhere({
        clientTransaction: params.clientTransaction,
      }),
      {
        group: getGroupNewMembershipSinceLastSyncWhere({
          userId: params.userId,
          clientTransaction: params.clientTransaction,
        }),
      },
    ],
  })

export const getWalletWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) =>
  getUnifiedSyncWhere({
    id: params.walletId,
    removed: params.removed,
    authorizationOr: [
      {
        group: getGroupWhere({
          userId: params.userId,
          groupId: params.groupId,
        }),
      },
    ],
    transactionOr: params.clientTransaction && [
      getChangedSinceLastSyncWhere({
        clientTransaction: params.clientTransaction,
      }),
      {
        group: getGroupNewMembershipSinceLastSyncWhere({
          userId: params.userId,
          clientTransaction: params.clientTransaction,
        }),
      },
    ],
  })

export const getOperationWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  operationId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) =>
  getUnifiedSyncWhere({
    id: params.operationId,
    removed: params.removed,
    authorizationOr: [
      {
        incomeWallet: getWalletWhere({
          userId: params.userId,
          groupId: params.groupId,
          walletId: params.walletId,
        }),
      },
      {
        expenseWallet: getWalletWhere({
          userId: params.userId,
          groupId: params.groupId,
          walletId: params.walletId,
        }),
      },
    ],
    transactionOr: params.clientTransaction && [
      getChangedSinceLastSyncWhere({
        clientTransaction: params.clientTransaction,
      }),
      {
        incomeWallet: {
          group: getGroupNewMembershipSinceLastSyncWhere({
            userId: params.userId,
            clientTransaction: params.clientTransaction,
          }),
        },
      },
      {
        expenseWallet: {
          group: getGroupNewMembershipSinceLastSyncWhere({
            userId: params.userId,
            clientTransaction: params.clientTransaction,
          }),
        },
      },
    ],
  })
