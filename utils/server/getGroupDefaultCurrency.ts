import { currencySelector } from '../../api/server/selectors/index.ts'
import { getGroupWhere } from '../../api/server/where/index.ts'
import { prisma } from './prisma.ts'

interface GetGroupDefaultCurrencyParams {
  userId: string
  groupId: string
}

export const getGroupDefaultCurrency = async (
  params: GetGroupDefaultCurrencyParams
) => {
  const group = await prisma.group.findFirstOrThrow({
    where: getGroupWhere({
      userId: params.userId,
      groupId: params.groupId,
    }),
    select: {
      defaultCurrency: { select: currencySelector },
    },
  })

  return group.defaultCurrency
}
