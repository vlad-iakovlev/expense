import assert from 'assert'
import { NextApiHandler } from 'next'
import fetch from 'node-fetch'
import { prisma } from '../../../utils/server/prisma.js'

interface SymbolsResponse {
  symbols: Record<string, string>
  success: boolean
}

export const updateCurrencyNames: NextApiHandler<{ success: boolean }> = async (
  req,
  res,
) => {
  assert(
    process.env.EXCHANGE_RATES_API_KEY,
    'EXCHANGE_RATES_API_KEY is not defined',
  )

  const ratesResponse = await fetch(
    'https://api.apilayer.com/exchangerates_data/symbols',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  )
  const symbols = (await ratesResponse.json()) as SymbolsResponse

  await prisma.$transaction(
    Object.entries(symbols.symbols).map(([symbol, name]) => {
      return prisma.currency.updateMany({
        where: { symbol },
        data: { name },
      })
    }),
  )

  res.status(200).json({ success: true })
}
