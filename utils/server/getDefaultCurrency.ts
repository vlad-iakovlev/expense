import { currencySelector } from '../../api/server/selectors/index.ts'
import { prisma } from './prisma.ts'

export const getDefaultCurrency = async () => {
  return await prisma.currency.findFirstOrThrow({
    where: {
      name: 'USD',
    },
    select: currencySelector,
  })
}
