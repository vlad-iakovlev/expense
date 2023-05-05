import { NextApiHandler } from 'next'
import { prisma } from '../../utils/server/prisma.ts'
import {
  PerformSyncBody,
  PerformSyncResponse,
  PerformSyncResponseUpdates,
} from '../types.ts'
import { performSyncBodySchema } from './schemas.ts'
import {
  getGroupWhere,
  getOperationWhere,
  getUserGroupWhere,
  getWalletWhere,
} from './where.ts'

interface UpdatedIds {
  userGroupIds: string[]
  groupIds: string[]
  walletIds: string[]
  operationIds: string[]
}

export const performSync: NextApiHandler<PerformSyncResponse> = async (
  req,
  res
) => {
  const body = performSyncBodySchema.parse(req.body)

  // If cold start, respond with all data available to user
  if (!body.lastTransactionId) {
    res.status(200).json(await collectAll(req.session.user.id))
    return
  }

  try {
    if (body.updates) {
      await applyUpdates(req.session.user.id, body.updates)
    }

    const updates = await collectUpdates(
      req.session.user.id,
      body.lastTransactionId
    )

    res.status(200).json(updates)
  } catch (error) {
    // In case of error, ask client to perform cold start
    console.error(error)
    res.status(200).json({ coldStartNeeded: true })
  }
}

const applyUpdates = async (
  userId: string,
  updates: NonNullable<PerformSyncBody['updates']>
): Promise<void> => {
  await prisma.$transaction(
    [
      updates.groups.map((group) => {
        const groupData = {
          name: group.name,
          defaultCurrencyId: group.defaultCurrencyId,
        }

        return prisma.group.upsert({
          where: getGroupWhere({
            userId,
            groupId: group.id,
          }),
          create: {
            ...groupData,
            id: group.id,
            userGroups: {
              create: {
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            },
          },
          update: groupData,
          select: { id: true },
        })
      }),

      updates.wallets.map((wallet) => {
        const walletData = {
          name: wallet.name,
          order: wallet.order,
          currency: {
            connect: {
              id: wallet.currencyId,
            },
          },
        }

        return prisma.wallet.upsert({
          where: getWalletWhere({
            userId,
            walletId: wallet.id,
          }),
          create: {
            ...walletData,
            id: wallet.id,
            group: {
              connect: getGroupWhere({
                userId,
                groupId: wallet.groupId,
                removed: false,
              }),
            },
          },
          update: walletData,
          select: { id: true },
        })
      }),

      updates.operations.map((operation) => {
        const operationData = {
          name: operation.name,
          category: operation.category,
          date: operation.date,
          incomeAmount: operation.incomeAmount,
          expenseAmount: operation.expenseAmount,
          ...(operation.incomeWalletId && {
            incomeWallet: {
              connect: getWalletWhere({
                userId,
                walletId: operation.incomeWalletId,
                removed: false,
              }),
            },
          }),
          ...(operation.expenseWalletId && {
            expenseWallet: {
              connect: getWalletWhere({
                userId,
                walletId: operation.expenseWalletId,
                removed: false,
              }),
            },
          }),
        }

        return prisma.operation.upsert({
          where: getOperationWhere({
            userId,
            operationId: operation.id,
          }),
          create: {
            ...operationData,
            id: operation.id,
          },
          update: {
            ...operationData,
            ...(!operation.incomeWalletId && {
              incomeWallet: { disconnect: true },
            }),
            ...(!operation.expenseWalletId && {
              expenseWallet: { disconnect: true },
            }),
          },
          select: { id: true },
        })
      }),

      prisma.transaction.create({
        data: {
          userGroupIds: [], // TODO !!!!!!
          groupIds: updates.groups.map((group) => group.id),
          walletIds: updates.wallets.map((wallet) => wallet.id),
          operationIds: updates.operations.map((operation) => operation.id),
        },
        select: { id: true },
      }),
    ].flat()
  )
}

const collectUpdates = async (
  userId: string,
  lastTransactionId: string
): Promise<PerformSyncResponse> => {
  const clientLastTransaction = await prisma.transaction.findFirstOrThrow({
    where: {
      id: lastTransactionId,
    },
    select: {
      id: true,
      createdAt: true,
    },
  })

  const [lastTransaction, transactions] = await prisma.$transaction([
    prisma.transaction.findFirstOrThrow({
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    }),

    prisma.transaction.findMany({
      where: {
        createdAt: {
          gt: clientLastTransaction.createdAt,
        },
      },
      select: {
        userGroupIds: true,
        groupIds: true,
        walletIds: true,
        operationIds: true,
      },
    }),
  ])

  const userGroupIds = transactions
    .map((transaction) => transaction.userGroupIds)
    .flat()

  const groupIds = transactions
    .map((transaction) => transaction.groupIds)
    .flat()

  const walletIds = transactions
    .map((transaction) => transaction.walletIds)
    .flat()

  const operationIds = transactions
    .map((transaction) => transaction.operationIds)
    .flat()

  return {
    coldStartNeeded: false,
    lastTransactionId: lastTransaction.id,
    updates: await collect(userId, {
      userGroupIds,
      groupIds,
      walletIds,
      operationIds,
    }),
  }
}

const collectAll = async (userId: string): Promise<PerformSyncResponse> => {
  const lastTransaction = await prisma.transaction.findFirstOrThrow({
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  })

  return {
    coldStartNeeded: false,
    lastTransactionId: lastTransaction.id,
    updates: await collect(userId),
  }
}

const collect = async (
  userId: string,
  updatedIds?: UpdatedIds
): Promise<PerformSyncResponseUpdates> => {
  const [currencies, users, userGroups, groups, wallets, operations] =
    await prisma.$transaction([
      // Send all currencies without transactional filtering
      prisma.currency.findMany({
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          symbol: true,
          rate: true,
        },
      }),

      // Send all users available to requester without transactional filtering
      prisma.user.findMany({
        where: {
          OR: [
            { id: userId },
            {
              userGroups: {
                some: getUserGroupWhere({
                  userId,
                  removed: false,
                }),
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      }),

      prisma.userGroup.findMany({
        where: getUserGroupWhere({
          userId,
          userGroupId: updatedIds?.userGroupIds,
        }),
        select: {
          id: true,
          removed: true,
          userId: true,
          groupId: true,
        },
      }),

      prisma.group.findMany({
        where: getGroupWhere({
          userId,
          groupId: updatedIds?.groupIds,
        }),
        select: {
          id: true,
          removed: true,
          name: true,
          defaultCurrencyId: true,
        },
      }),

      prisma.wallet.findMany({
        where: getWalletWhere({
          userId,
          walletId: updatedIds?.walletIds,
        }),
        select: {
          id: true,
          removed: true,
          name: true,
          order: true,
          currencyId: true,
          groupId: true,
        },
      }),

      prisma.operation.findMany({
        where: getOperationWhere({
          userId,
          operationId: updatedIds?.operationIds,
        }),
        select: {
          id: true,
          removed: true,
          name: true,
          category: true,
          date: true,
          incomeAmount: true,
          expenseAmount: true,
          incomeWalletId: true,
          expenseWalletId: true,
        },
      }),
    ])

  return {
    currencies,
    users,
    userGroups,
    groups,
    wallets,
    operations,
  }
}
