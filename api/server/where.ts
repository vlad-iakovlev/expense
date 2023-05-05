import { Enumerable } from '../../types/utility.ts'

export const getUserGroupWhere = (params: {
  userId: string
  userGroupId?: Enumerable<string>
  removed?: boolean
}) => ({
  id: { in: params.userGroupId },
  removed: params.removed,
  OR: [
    { userId: params.userId },
    // We need this to get other users from groups available to requester
    {
      group: getGroupWhere({
        userId: params.userId,
        removed: false,
      }),
    },
  ],
})

interface GroupWhere<GroupId extends Enumerable<string>> {
  id: GroupId extends string ? string : { in?: string[] }
  removed?: boolean
  userGroups: {
    some: {
      removed: boolean
      userId: string
    }
  }
}

export const getGroupWhere = <GroupId extends Enumerable<string>>(params: {
  userId: string
  groupId?: GroupId
  removed?: boolean
}) =>
  ({
    id:
      typeof params.groupId === 'string'
        ? params.groupId
        : { in: params.groupId },
    removed: params.removed,
    userGroups: {
      some: {
        removed: false,
        userId: params.userId,
      },
    },
  } as GroupWhere<GroupId>)

interface WalletWhere<WalletId extends Enumerable<string>> {
  id: WalletId extends string ? string : { in?: string[] }
  removed?: boolean
  group: GroupWhere<string>
}

export const getWalletWhere = <WalletId extends Enumerable<string>>(params: {
  userId: string
  groupId?: string
  walletId?: WalletId
  removed?: boolean
}) =>
  ({
    id: { in: params.walletId },
    removed: params.removed,
    group: getGroupWhere({
      userId: params.userId,
      groupId: params.groupId,
      removed: false,
    }),
  } as WalletWhere<WalletId>)

interface OperationWhere<OperationId extends Enumerable<string>> {
  id: OperationId extends string ? string : { in?: string[] }
  removed?: boolean
  OR: [
    { incomeWallet: WalletWhere<string> },
    { expenseWallet: WalletWhere<string> }
  ]
}

export const getOperationWhere = <
  OperationId extends Enumerable<string>
>(params: {
  userId: string
  groupId?: string
  walletId?: string
  operationId?: OperationId
  removed?: boolean
}) =>
  ({
    id: { in: params.operationId },
    removed: params.removed,
    OR: [
      {
        incomeWallet: getWalletWhere({
          userId: params.userId,
          groupId: params.groupId,
          walletId: params.walletId,
          removed: false,
        }),
      },
      {
        expenseWallet: getWalletWhere({
          userId: params.userId,
          groupId: params.groupId,
          walletId: params.walletId,
          removed: false,
        }),
      },
    ],
  } as OperationWhere<OperationId>)
