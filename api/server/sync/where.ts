export const getUserGroupWhere = (params: {
  userId: string
  userGroupId?: string
  removed?: boolean
}) => ({
  id: params.userGroupId,
  removed: params.removed,
  OR: [
    { userId: params.userId },
    // We need this to get other users from groups available to requester
    { group: getGroupWhere({ userId: params.userId }) },
  ],
})

export const getGroupWhere = (params: {
  userId: string
  groupId?: string
  removed?: boolean
}) => ({
  id: params.groupId,
  removed: params.removed,
  userGroups: {
    some: {
      removed: false,
      userId: params.userId,
    },
  },
})

export const getWalletWhere = (params: {
  userId: string
  groupId?: string
  walletId?: string
  removed?: boolean
}) => ({
  id: params.walletId,
  removed: params.removed,
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
  removed?: boolean
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
})
