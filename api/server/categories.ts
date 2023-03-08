import { NextApiHandler } from 'next'
import { GetCategoriesResponse } from '../types/categories'
import { getCategoriesQuerySchema } from './schemas/categories'

export const getCategories: NextApiHandler<GetCategoriesResponse> = async (
  req,
  res
) => {
  const query = getCategoriesQuerySchema.parse(req.query)

  const items = await req.prisma.operation.groupBy({
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
