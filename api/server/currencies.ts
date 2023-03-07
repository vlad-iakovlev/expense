import { NextApiHandler } from 'next'
import { GetCurrenciesResponse } from '../types/currencies'
import { currencySelector } from './selectors'

export const getCurrencies: NextApiHandler<GetCurrenciesResponse> = async (
  req,
  res
) => {
  const currencies = await req.prisma.currency.findMany({
    orderBy: {
      name: 'asc',
    },
    select: currencySelector,
  })

  res.status(200).json({ currencies })
}
