import assert from 'assert'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { prisma } from '@/utils/prisma.js'

type RatesResponse = {
  base: string
  date: string
  rates: Record<string, number>
  success: boolean
  timestamp: number
}

export const updateCurrencyRatesHandler = async (c: Context) => {
  try {
    assert(process.env.CRON_SECRET, 'CRON_SECRET is not set')
    assert(
      process.env.EXCHANGE_RATES_API_KEY,
      'EXCHANGE_RATES_API_KEY is not set',
    )

    if (c.req.header('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      throw new HTTPException(401)
    }

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

    return c.json({ ok: true })
  } catch (error) {
    if (error instanceof HTTPException) throw error

    console.error(error)
    throw new HTTPException()
  }
}
