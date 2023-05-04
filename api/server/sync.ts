import { NextApiHandler } from 'next'
import { prisma } from '../../utils/server/prisma.ts'
import { PerformSyncResponse } from '../types.ts'
import { performSyncBodySchema } from './schemas.ts'
import { getGroupWhere, getOperationWhere, getWalletWhere } from './where.ts'

export const performSync: NextApiHandler<PerformSyncResponse> = async (
  req,
  res
) => {
  const body = performSyncBodySchema.parse(req.body)

  await prisma.$transaction([
    ...body.groups.map((group) => {
      const groupData = {
        removed: group.removed,
        name: group.name,
        defaultCurrency: {
          connect: {
            id: group.defaultCurrencyId,
          },
        },
      }

      return prisma.group.upsert({
        where: getGroupWhere({
          userId: req.session.user.id,
          groupId: group.id,
        }),
        create: {
          ...groupData,
          id: group.id,
          users: {
            connect: {
              id: req.session.user.id,
            },
          },
        },
        update: groupData,
        select: {
          id: true,
        },
      })
    }),

    ...body.wallets.map((wallet) => {
      const walletData = {
        removed: wallet.removed,
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
          userId: req.session.user.id,
          walletId: wallet.id,
        }),
        create: {
          ...walletData,
          id: wallet.id,
          group: {
            connect: getGroupWhere({
              userId: req.session.user.id,
              groupId: wallet.groupId,
            }),
          },
        },
        update: walletData,
        select: {
          id: true,
        },
      })
    }),

    ...body.operations.map((operation) => {
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
              userId: req.session.user.id,
              walletId: operation.incomeWalletId,
            }),
          },
        }),
        ...(operation.expenseWalletId && {
          expenseWallet: {
            connect: getWalletWhere({
              userId: req.session.user.id,
              walletId: operation.expenseWalletId,
            }),
          },
        }),
      }

      return prisma.operation.upsert({
        where: getOperationWhere({
          userId: req.session.user.id,
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
        select: {
          id: true,
        },
      })
    }),
  ])

  const currencies = await prisma.currency.findMany({
    select: {
      id: true,
      name: true,
      symbol: true,
      rate: true,
    },
  })

  const groups = await prisma.group.findMany({
    where: getGroupWhere({
      userId: req.session.user.id,
    }),
    select: {
      id: true,
      removed: true,
      name: true,
      defaultCurrencyId: true,
      users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  })

  const wallets = await prisma.wallet.findMany({
    where: {
      ...getWalletWhere({
        userId: req.session.user.id,
      }),
      updatedAt: {
        gte: body.syncedAt ?? undefined,
      },
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

  const operations = await prisma.operation.findMany({
    where: {
      ...getOperationWhere({
        userId: req.session.user.id,
      }),
      updatedAt: {
        gte: body.syncedAt ?? undefined,
      },
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

  res.status(200).json({
    currencies,
    groups,
    wallets,
    operations,
  })
}
