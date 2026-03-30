import assert from 'assert'
import fetch from 'node-fetch'
import { prisma } from '@/utils/server/prisma'

type RatesResponse = {
  base: string
  date: string
  rates: Record<string, number>
  success: boolean
  timestamp: number
}

export const updateCurrencyRates = async (): Promise<{ ok: boolean }> => {
  assert(
    process.env.EXCHANGE_RATES_API_KEY,
    'EXCHANGE_RATES_API_KEY is not defined',
  )

  const response = (await fetch(
    'https://api.apilayer.com/exchangerates_data/latest?base=USD',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  ).then((response) => response.json())) as RatesResponse

  await prisma.$transaction(
    Object.entries(response.rates).map(([symbol, rate]) =>
      prisma.currency.upsert({
        where: { symbol },
        create: { symbol, rate },
        update: { rate },
        select: { id: true },
      }),
    ),
  )

  return { ok: true }
}
