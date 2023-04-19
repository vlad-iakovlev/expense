import { NextApiHandler } from 'next'
import { prisma } from '../../utils/server/prisma.ts'
import { GetCurrenciesResponse } from '../types/currencies.ts'
import { currencySelector } from './selectors/index.ts'

export const getCurrencies: NextApiHandler<GetCurrenciesResponse> = async (
  req,
  res
) => {
  const currencies = await prisma.currency.findMany({
    orderBy: {
      name: 'asc',
    },
    select: currencySelector,
  })

  res.status(200).json({ currencies })
}
