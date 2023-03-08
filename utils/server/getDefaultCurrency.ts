import { NextApiRequest } from 'next'
import { currencySelector } from '../../api/server/selectors'

export const getDefaultCurrency = async (req: NextApiRequest) => {
  return await req.prisma.currency.findFirstOrThrow({
    where: {
      name: 'USD',
    },
    select: currencySelector,
  })
}
