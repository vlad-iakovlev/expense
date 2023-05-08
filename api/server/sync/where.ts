export const getGroupWhere = (params: {
  userId: string
  groupId?: string
  removed?: boolean
  transactionIds?: string[]
}) => ({
  id: params.groupId,
  removed: params.removed,
  userGroups: {
    some: {
      removed: false,
      userId: params.userId,
    },
  },
  ...(params.transactionIds && {
    transactionIds: { hasSome: params.transactionIds },
  }),
})

export const getUserGroupWhere = (params: {
  userId: string
  userGroupId?: string
  removed?: boolean
  transactionIds?: string[]
}) => ({
  id: params.userGroupId,
  removed: params.removed,
  OR: [
    { userId: params.userId },
    { group: getGroupWhere({ userId: params.userId }) },
  ],
  ...(params.transactionIds && {
    transactionIds: { hasSome: params.transactionIds },
  }),
})

export const getWalletWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  removed?: boolean
  transactionIds?: string[]
}) => ({
  id: params.walletId,
  removed: params.removed,
  group: getGroupWhere({
    userId: params.userId,
    groupId: params.groupId,
  }),
  ...(params.transactionIds && {
    transactionIds: { hasSome: params.transactionIds },
  }),
})

export const getOperationWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  operationId?: string
  removed?: boolean
  transactionIds?: string[]
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
  ...(params.transactionIds && {
    transactionIds: { hasSome: params.transactionIds },
  }),
})
