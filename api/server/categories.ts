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
import { getOperationWhere } from './where/index.ts'

export const getCategories: NextApiHandler<GetCategoriesResponse> = async (
  req,
  res
) => {
  const query = getCategoriesQuerySchema.parse(req.query)

  const items = await prisma.operation.groupBy({
    where: getOperationWhere({
      userId: req.session.user.id,
      groupId: query.groupId,
      walletId: query.walletId,
    }),
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
      ...getOperationWhere({
        userId: req.session.user.id,
        groupId: body.groupId,
        walletId: body.walletId,
      }),
      category: body.category,
    },
    data: {
      category: body.name,
    },
  })

  res.status(200).json({ ok: true })
}
