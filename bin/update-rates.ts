import assert from 'assert'
import * as dotenv from 'dotenv-flow'
import fetch from 'node-fetch'
import { prisma } from '../utils/server/prisma.ts'

interface RatesResponse {
  base: string
  date: string
  rates: Record<string, number>
  success: boolean
  timestamp: number
}

void (async () => {
  try {
    dotenv.config()
    assert(
      process.env.EXCHANGE_RATES_API_KEY,
      'EXCHANGE_RATES_API_KEY is not defined'
    )

    const ratesResponse = await fetch(
      'https://api.apilayer.com/exchangerates_data/latest?base=USD',
      { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } }
    )
    const rates = (await ratesResponse.json()) as RatesResponse

    await prisma.$transaction(
      Object.entries(rates.rates).map(([name, rate]) => {
        return prisma.currency.updateMany({
          where: { name },
          data: { rate },
        })
      })
    )

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
