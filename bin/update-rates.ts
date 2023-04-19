import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv-flow'
import fetch from 'node-fetch'

interface RatesResponse {
  base: string
  date: string
  rates: Record<string, number>
  success: boolean
  timestamp: number
}

const fetchRates = async (): Promise<RatesResponse> => {
  if (!process.env.EXCHANGE_RATES_API_KEY) {
    throw new Error(
      'You should provide EXCHANGE_RATES_API_KEY environment variable'
    )
  }

  const response = await fetch(
    'https://api.apilayer.com/exchangerates_data/latest?base=USD',
    {
      headers: {
        apikey: process.env.EXCHANGE_RATES_API_KEY,
      },
    }
  )

  return (await response.json()) as RatesResponse
}

const updateRates = async () => {
  const prisma = new PrismaClient()

  const rates = await fetchRates()

  await prisma.$transaction(
    Object.entries(rates.rates).map(([name, rate]) => {
      return prisma.currency.updateMany({
        where: { name },
        data: { rate },
      })
    })
  )
}

void (async () => {
  try {
    dotenv.config()

    await updateRates()

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
