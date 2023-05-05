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
  const transaction = await prisma.transaction.create({
    data: { draft: true },
    select: { id: true },
  })

  const updateGroups = updates.groups.map((group) => {
    const userGroupData = {
      userId,
      transactions: { connect: { id: transaction.id } },
    }

    const groupData = {
      removed: group.removed,
      name: group.name,
      defaultCurrencyId: group.defaultCurrencyId,
      transactions: { connect: { id: transaction.id } },
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
          create: userGroupData,
        },
      },
      update: groupData,
      select: { id: true },
    })
  })

  const updateWallets = updates.wallets.map((wallet) => {
    const walletData = {
      removed: wallet.removed,
      name: wallet.name,
      order: wallet.order,
      currency: { connect: { id: wallet.currencyId } },
      transactions: { connect: { id: transaction.id } },
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
          }),
        },
      },
      update: walletData,
      select: { id: true },
    })
  })

  const updateOperations = updates.operations.map((operation) => {
    const operationData = {
      removed: operation.removed,
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
          }),
        },
      }),
      ...(operation.expenseWalletId && {
        expenseWallet: {
          connect: getWalletWhere({
            userId,
            walletId: operation.expenseWalletId,
          }),
        },
      }),
      transactions: { connect: { id: transaction.id } },
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
  })

  const updateTransaction = prisma.transaction.update({
    where: { id: transaction.id },
    data: { draft: false },
    select: { id: true },
  })

  await prisma.$transaction([
    ...updateGroups,
    ...updateWallets,
    ...updateOperations,
    updateTransaction,
  ])
}

const collectUpdates = async (
  userId: string,
  lastTransactionId: string
): Promise<PerformSyncResponse> => {
  const clientLastTransaction = await prisma.transaction.findFirstOrThrow({
    where: { id: lastTransactionId },
    select: { createdAt: true },
  })

  const [lastTransaction, transactions] = await prisma.$transaction([
    prisma.transaction.findFirstOrThrow({
      where: { draft: false },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    }),

    prisma.transaction.findMany({
      where: {
        createdAt: { gt: clientLastTransaction.createdAt },
        draft: false,
      },
      select: { id: true },
    }),
  ])

  return {
    coldStartNeeded: false,
    lastTransactionId: lastTransaction.id,
    updates: await collect(
      userId,
      transactions.map((transaction) => transaction.id)
    ),
  }
}

const collectAll = async (userId: string): Promise<PerformSyncResponse> => {
  const lastTransaction = await prisma.transaction.findFirstOrThrow({
    where: { draft: false },
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
  transactionIds?: string[]
): Promise<PerformSyncResponseUpdates> => {
  // Find all currencies without transactional filtering
  const findCurrencies = prisma.currency.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      symbol: true,
      rate: true,
    },
  })

  // Find all users available to requester without transactional filtering
  const findUsers = prisma.user.findMany({
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
  })

  const findUserGroups = prisma.userGroup.findMany({
    where: {
      ...getUserGroupWhere({ userId }),
      ...(transactionIds && { transactionIds: { hasSome: transactionIds } }),
    },
    select: {
      id: true,
      removed: true,
      userId: true,
      groupId: true,
    },
  })

  const findGroups = prisma.group.findMany({
    where: {
      ...getGroupWhere({ userId }),
      ...(transactionIds && { transactionIds: { hasSome: transactionIds } }),
    },
    select: {
      id: true,
      removed: true,
      name: true,
      defaultCurrencyId: true,
    },
  })

  const findWallets = prisma.wallet.findMany({
    where: {
      ...getWalletWhere({ userId }),
      ...(transactionIds && { transactionIds: { hasSome: transactionIds } }),
    },
    select: {
      id: true,
      removed: true,
      name: true,
      order: true,
      currencyId: true,
      groupId: true,
    },
  })

  const findOperations = prisma.operation.findMany({
    where: {
      ...getOperationWhere({ userId }),
      ...(transactionIds && { transactionIds: { hasSome: transactionIds } }),
    },
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
  })

  const [currencies, users, userGroups, groups, wallets, operations] =
    await prisma.$transaction([
      findCurrencies,
      findUsers,
      findUserGroups,
      findGroups,
      findWallets,
      findOperations,
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
