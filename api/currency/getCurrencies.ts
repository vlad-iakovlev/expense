import { NextApiHandler } from 'next'
import { ClientCurrency } from '../../models/currency'
import { currencySelect } from './constants'

export interface GetCurrenciesResponse {
  currencies: ClientCurrency[]
}

export const getCurrencies: NextApiHandler<GetCurrenciesResponse> = async (
  req,
  res
) => {
  const currencies = await req.prisma.currency.findMany({
    select: currencySelect,
  })

  res.status(200).json({ currencies })
}
