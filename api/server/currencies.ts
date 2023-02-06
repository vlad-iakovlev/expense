import { NextApiHandler } from 'next'
import { GetCurrenciesResponse } from '../types/currencies'

const select = {
  id: true,
  name: true,
  symbol: true,
}

export const getCurrencies: NextApiHandler<GetCurrenciesResponse> = async (
  req,
  res
) => {
  const currencies = await req.prisma.currency.findMany({
    orderBy: {
      name: 'asc',
    },
    select,
  })

  res.status(200).json({ currencies })
}
