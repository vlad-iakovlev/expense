import { NextApiRequest } from 'next'
import { currencySelector } from '../../api/server/selectors/index.ts'
import { prisma } from './prisma.ts'

export const getGroupDefaultCurrency = async (
  req: NextApiRequest,
  groupId: string
) => {
  const group = await prisma.group.findFirstOrThrow({
    where: {
      id: groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
    select: {
      defaultCurrency: { select: currencySelector },
    },
  })

  return group.defaultCurrency
}
