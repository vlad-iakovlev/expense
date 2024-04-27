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

  const ratesResponse = await fetch(
    'https://api.apilayer.com/exchangerates_data/latest?base=USD',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  )
  const rates = (await ratesResponse.json()) as RatesResponse

  await prisma.$transaction(
    Object.entries(rates.rates).map(([symbol, rate]) => {
      return prisma.currency.upsert({
        where: { symbol },
        create: { symbol, rate },
        update: { rate },
        select: { id: true },
      })
    }),
  )

  res.status(200).json({ ok: true })
}

interface SymbolsResponse {
  symbols: Record<string, string>
  success: boolean
}

export const updateCurrencyNames: NextApiHandler<{ ok: boolean }> = async (
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

  res.status(200).json({ ok: true })
}
