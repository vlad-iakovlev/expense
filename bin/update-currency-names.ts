import assert from 'assert'
import chalk from 'chalk'
import fetch from 'node-fetch'
import { prisma } from '../utils/server/prisma.ts'

interface SymbolsResponse {
  symbols: Record<string, string>
  success: boolean
}

const fetchSymbols = async () => {
  assert(
    process.env.EXCHANGE_RATES_API_KEY,
    'EXCHANGE_RATES_API_KEY is not defined',
  )

  const ratesResponse = await fetch(
    'https://api.apilayer.com/exchangerates_data/symbols',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  )

  return (await ratesResponse.json()) as SymbolsResponse
}

const updateNames = async (symbols: SymbolsResponse) => {
  await prisma.$transaction(
    Object.entries(symbols.symbols).map(([symbol, name]) => {
      return prisma.currency.updateMany({
        where: { symbol },
        data: { name },
      })
    }),
  )
}

void (async () => {
  try {
    console.log(chalk.blue.bold('[update-rates]'), 'Fetching symbols')
    const symbols = await fetchSymbols()
    console.log(chalk.green.bold('[update-rates]'), 'Symbols fetched')

    console.log(chalk.blue.bold('[update-rates]'), 'Updating namers')
    await updateNames(symbols)
    console.log(chalk.green.bold('[update-rates]'), 'Names updated')

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
