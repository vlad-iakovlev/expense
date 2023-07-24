import assert from 'assert'
import chalk from 'chalk'
import fetch from 'node-fetch'
import { prisma } from '../utils/server/prisma.ts'

interface RatesResponse {
  base: string
  date: string
  rates: Record<string, number>
  success: boolean
  timestamp: number
}

const fetchRates = async () => {
  assert(
    process.env.EXCHANGE_RATES_API_KEY,
    'EXCHANGE_RATES_API_KEY is not defined',
  )

  const ratesResponse = await fetch(
    'https://api.apilayer.com/exchangerates_data/latest?base=USD',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  )

  return (await ratesResponse.json()) as RatesResponse
}

const updateRates = async (rates: RatesResponse) => {
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
}

void (async () => {
  try {
    console.log(chalk.blue.bold('[update-rates]'), 'Fetching rates')
    const rates = await fetchRates()
    console.log(chalk.green.bold('[update-rates]'), 'Rates fetched')

    console.log(chalk.blue.bold('[update-rates]'), 'Updating rates')
    await updateRates(rates)
    console.log(chalk.green.bold('[update-rates]'), 'Rates updated')

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
