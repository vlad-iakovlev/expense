import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { AuthType } from '@/auth.js'
import { Transaction } from '@/generated/prisma/client.js'
import { authMiddleware } from '@/middlewares/auth.js'
import { errorMiddleware } from '@/middlewares/error.js'
import { Modify } from '@/types/utility.js'
import { prisma } from '@/utils/prisma.js'
import { performSyncBodySchema } from './schemas.js'
import { PerformSyncBody, PerformSyncResponse } from './types.js'
import {
  getGroupWhere,
  getOperationWhere,
  getUserGroupWhere,
  getWalletWhere,
} from './where.js'

const applyUpdates = async (
  userId: string,
  updates: PerformSyncBody['updates'],
): Promise<void> => {
  if (!updates) return

  try {
    const transaction = await prisma.transaction.create({
      data: {},
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

    const updateUserGroups = updates.userGroups.map((userGroup) =>
      prisma.userGroup.update({
        where: getUserGroupWhere({
          userId,
          userGroupId: userGroup.id,
        }),
        data: {
          removed: userGroup.removed,
          transactions: { connect: { id: transaction.id } },
        },
        select: { id: true },
      }),
    )

    await prisma.$transaction([
      ...updateGroups,
      ...updateWallets,
      ...updateOperations,
      ...updateUserGroups,
    ])

    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { completedAt: new Date() },
      select: { id: true },
    })
  } catch (error) {
    console.error('Error applying updates', error)
    throw new HTTPException(400, { message: 'Invalid updates' })
  }
}

const findTransaction = async (transactionId: string) => {
  try {
    return (await prisma.transaction.findFirstOrThrow({
      where: { id: transactionId, NOT: { completedAt: null } },
    })) as Modify<Transaction, { completedAt: Date }>
  } catch (error) {
    console.error('Error finding transaction', error)
    throw new HTTPException(400, { message: 'Invalid transaction' })
  }
}

const collect = async (
  userId: string,
  clientTransaction?: Modify<Transaction, { completedAt: Date }>,
): Promise<PerformSyncResponse> => {
  const findLastTransaction = prisma.transaction.findFirstOrThrow({
    where: { NOT: { completedAt: null } },
    orderBy: { completedAt: 'desc' },
    select: { id: true },
  })

  // Find all currencies without transactional filtering
  const findCurrencies = prisma.currency.findMany({
    orderBy: { symbol: 'asc' },
    select: {
      id: true,
      symbol: true,
      rate: true,
    },
  })

  // Find all users available to requester without transactional filtering
  const findUsers = prisma.user.findMany({
    where: {
      userGroups: {
        some: getUserGroupWhere({
          userId,
          removed: false,
        }),
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  })

  const findUserGroups = prisma.userGroup.findMany({
    where: getUserGroupWhere({ userId, clientTransaction }),
    select: {
      id: true,
      removed: true,
      userId: true,
      groupId: true,
    },
  })

  const findGroups = prisma.group.findMany({
    where: getGroupWhere({ userId, clientTransaction }),
    select: {
      id: true,
      removed: true,
      name: true,
      defaultCurrencyId: true,
    },
  })

  const findWallets = prisma.wallet.findMany({
    where: getWalletWhere({ userId, clientTransaction }),
    select: {
      id: true,
      createdAt: true,
      removed: true,
      name: true,
      order: true,
      currencyId: true,
      groupId: true,
    },
  })

  const findOperations = prisma.operation.findMany({
    where: getOperationWhere({ userId, clientTransaction }),
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

  const [
    lastTransaction,
    currencies,
    users,
    userGroups,
    groups,
    wallets,
    operations,
  ] = await prisma.$transaction([
    findLastTransaction,
    findCurrencies,
    findUsers,
    findUserGroups,
    findGroups,
    findWallets,
    findOperations,
  ])

  return {
    lastTransactionId: lastTransaction.id,
    updates: {
      currencies,
      users,
      userGroups,
      groups,
      wallets: wallets.map((wallet) => ({
        ...wallet,
        createdAt: wallet.createdAt.toISOString(),
      })),
      operations: operations.map((operation) => ({
        ...operation,
        date: operation.date.toISOString(),
      })),
    },
  }
}

const router = new Hono<{ Variables: AuthType }>({ strict: false })

router.use(errorMiddleware, authMiddleware)

router.post('/', async (c) => {
  const { updates: clientUpdates, lastTransactionId } =
    performSyncBodySchema.parse(await c.req.json())

  const userId = c.get('session').user.id
  await applyUpdates(userId, clientUpdates)

  const lastTransaction = lastTransactionId
    ? await findTransaction(lastTransactionId)
    : undefined

  const response = await collect(userId, lastTransaction)

  return c.json<PerformSyncResponse>(response)
})

export default router
