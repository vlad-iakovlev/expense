import { Transaction } from '@prisma/client'
import { Modify } from '../../../types/utility.js'

const getGroupAddedSinceLastSyncWhere = (params: {
  userId: string
  clientTransaction: Modify<Transaction, { completedAt: Date }>
}) => ({
  userGroups: {
    some: {
      removed: false,
      userId: params.userId,
      transactions: {
        some: {
          completedAt: { gt: params.clientTransaction.completedAt },
        },
      },
    },
  },
})

export const getGroupWhere = (params: {
  userId: string
  groupId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) => ({
  id: params.groupId,
  removed: params.removed,
  userGroups: {
    some: {
      removed: false,
      userId: params.userId,
    },
  },
  ...(params.clientTransaction && {
    OR: [
      {
        transactions: {
          some: {
            completedAt: { gt: params.clientTransaction.completedAt },
          },
        },
      },
      getGroupAddedSinceLastSyncWhere({
        userId: params.userId,
        clientTransaction: params.clientTransaction,
      }),
    ],
  }),
})

export const getUserGroupWhere = (params: {
  userId: string
  userGroupId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) => ({
  id: params.userGroupId,
  removed: params.removed,
  OR: [
    { userId: params.userId },
    { group: getGroupWhere({ userId: params.userId }) },
  ],
  ...(params.clientTransaction && {
    OR: [
      {
        transactions: {
          some: {
            completedAt: { gt: params.clientTransaction.completedAt },
          },
        },
      },
      {
        group: getGroupAddedSinceLastSyncWhere({
          userId: params.userId,
          clientTransaction: params.clientTransaction,
        }),
      },
    ],
  }),
})

export const getWalletWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) => ({
  id: params.walletId,
  removed: params.removed,
  group: getGroupWhere({
    userId: params.userId,
    groupId: params.groupId,
  }),
  ...(params.clientTransaction && {
    OR: [
      {
        transactions: {
          some: {
            completedAt: { gt: params.clientTransaction.completedAt },
          },
        },
      },
      {
        group: getGroupAddedSinceLastSyncWhere({
          userId: params.userId,
          clientTransaction: params.clientTransaction,
        }),
      },
    ],
  }),
})

export const getOperationWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  operationId?: string
  removed?: boolean
  clientTransaction?: Modify<Transaction, { completedAt: Date }>
}) => ({
  id: params.operationId,
  removed: params.removed,
  OR: [
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
  ...(params.clientTransaction && {
    OR: [
      {
        transactions: {
          some: {
            completedAt: { gt: params.clientTransaction.completedAt },
          },
        },
      },
      {
        incomeWallet: {
          group: getGroupAddedSinceLastSyncWhere({
            userId: params.userId,
            clientTransaction: params.clientTransaction,
          }),
        },
      },
      {
        expenseWallet: {
          group: getGroupAddedSinceLastSyncWhere({
            userId: params.userId,
            clientTransaction: params.clientTransaction,
          }),
        },
      },
    ],
  }),
})
