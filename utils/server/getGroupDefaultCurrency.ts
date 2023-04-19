import { NextApiRequest } from 'next'
import { currencySelector } from '../../api/server/selectors/index.ts'

export const getGroupDefaultCurrency = async (
  req: NextApiRequest,
  groupId: string
) => {
  const group = await req.prisma.group.findFirstOrThrow({
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
