import { PrismaClient } from '@prisma/client'
import assert from 'assert'
import { NextApiHandler } from 'next'
import fetch from 'node-fetch'

const prisma = new PrismaClient()

interface RatesResponse {
  base: string
  date: string
  rates: Record<string, number>
  success: boolean
  timestamp: number
}

export const updateCurrencyRates: NextApiHandler<{ ok: boolean }> = async (
  req,
  res,
) => {
  assert(
    process.env.EXCHANGE_RATES_API_KEY,
    'EXCHANGE_RATES_API_KEY is not defined',
  )

  const response = (await fetch(
    'https://api.apilayer.com/exchangerates_data/latest?base=USD',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  ).then((response) => response.text())) as RatesResponse

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

  res.status(200).json({ ok: true })
}
