export const getGroupWhere = (params: {
  userId: string
  groupId?: string
}) => ({
  id: params.groupId,
  removed: false,
  userIds: {
    has: params.userId,
  },
})

export const getWalletWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
}) => ({
  id: params.walletId,
  removed: false,
  group: getGroupWhere({
    userId: params.userId,
    groupId: params.groupId,
  }),
})

export const getOperationWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  operationId?: string
  type?: 'income' | 'expense'
}) => ({
  id: params.operationId,
  removed: false,
  ...(params.type === 'income' && {
    incomeWallet: getWalletWhere({
      userId: params.userId,
      groupId: params.groupId,
      walletId: params.walletId,
    }),
  }),
  ...(params.type === 'expense' && {
    expenseWallet: getWalletWhere({
      userId: params.userId,
      groupId: params.groupId,
      walletId: params.walletId,
    }),
  }),
  ...(!params.type && {
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
  }),
})
