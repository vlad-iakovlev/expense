import { Transaction } from '@prisma/client'
import { Modify } from '../../../types/utility.ts'

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
    transactions: {
      some: {
        completedAt: { gt: params.clientTransaction.completedAt },
      },
    },
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
    transactions: {
      some: {
        completedAt: { gt: params.clientTransaction.completedAt },
      },
    },
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
    transactions: {
      some: {
        completedAt: { gt: params.clientTransaction.completedAt },
      },
    },
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
    transactions: {
      some: {
        completedAt: { gt: params.clientTransaction.completedAt },
      },
    },
  }),
})
