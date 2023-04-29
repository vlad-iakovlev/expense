import { NextApiHandler } from 'next'
import { prisma } from '../../utils/server/prisma.ts'
import { SynchronizeResponse } from '../types.ts'
import { synchronizeBodySchema } from './schemas.ts'
import { getGroupWhere, getOperationWhere, getWalletWhere } from './where.ts'

export const synchronize: NextApiHandler<SynchronizeResponse> = async (
  req,
  res
) => {
  const body = synchronizeBodySchema.parse(req.body)

  await prisma.$transaction([
    ...body.groups.map((group) => {
      const groupData = {
        name: group.name,
        removed: group.removed,
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
        name: wallet.name,
        order: wallet.order,
        removed: wallet.removed,
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
        name: operation.name,
        category: operation.category,
        date: operation.date,
        incomeAmount: operation.incomeAmount,
        expenseAmount: operation.expenseAmount,
        removed: operation.removed,
        incomeWallet: {
          ...(operation.incomeWalletId && {
            connect: getWalletWhere({
              userId: req.session.user.id,
              walletId: operation.incomeWalletId,
            }),
          }),
          ...(!operation.incomeWalletId && { disconnect: true }),
        },
        expenseWallet: {
          ...(operation.expenseWalletId && {
            connect: getWalletWhere({
              userId: req.session.user.id,
              walletId: operation.expenseWalletId,
            }),
          }),
          ...(!operation.expenseWalletId && { disconnect: true }),
        },
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
        update: operationData,
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
    include: {
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
        gte: body.startDate,
      },
    },
  })

  const operations = await prisma.operation.findMany({
    where: {
      ...getOperationWhere({
        userId: req.session.user.id,
      }),
      updatedAt: {
        gte: body.startDate,
      },
    },
  })

  res.status(200).json({
    currencies,
    groups,
    wallets,
    operations,
  })
}
