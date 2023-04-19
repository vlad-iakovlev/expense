import { NextApiHandler } from 'next'
import { prisma } from '../../utils/server/prisma.ts'
import {
  GetCategoriesResponse,
  RenameCategoryResponse,
} from '../types/categories.ts'
import {
  getCategoriesQuerySchema,
  renameCategoryBodySchema,
} from './schemas/categories.ts'

export const getCategories: NextApiHandler<GetCategoriesResponse> = async (
  req,
  res
) => {
  const query = getCategoriesQuerySchema.parse(req.query)

  const items = await prisma.operation.groupBy({
    where: {
      OR: [
        {
          incomeWallet: {
            id: query.walletId,
            group: {
              id: query.groupId,
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
        {
          expenseWallet: {
            id: query.walletId,
            group: {
              id: query.groupId,
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      ],
    },
    by: ['category'],
    orderBy: {
      category: 'asc',
    },
  })

  const categories = items.map((item) => item.category)

  res.status(200).json({ categories })
}

export const renameCategory: NextApiHandler<RenameCategoryResponse> = async (
  req,
  res
) => {
  const body = renameCategoryBodySchema.parse(req.body)

  await prisma.operation.updateMany({
    where: {
      OR: [
        {
          incomeWallet: {
            id: body.walletId,
            group: {
              id: body.groupId,
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
        {
          expenseWallet: {
            id: body.walletId,
            group: {
              id: body.groupId,
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      ],
      category: body.category,
    },
    data: {
      category: body.name,
    },
  })

  res.status(200).json({ ok: true })
}
