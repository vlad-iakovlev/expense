import { prisma } from '@expense/prisma'

const fetchCurrencyRates = async () => {
  if (!process.env.EXCHANGE_RATES_API_KEY) {
    throw new Error('EXCHANGE_RATES_API_KEY is not set')
  }

  const response = await fetch(
    'https://api.apilayer.com/exchangerates_data/latest?base=USD',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  )

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return (await response.json()) as {
    base: string
    date: string
    rates: Record<string, number>
    success: boolean
    timestamp: number
  }
}

export const updateCurrencyRates = async (): Promise<void> => {
  const { rates } = await fetchCurrencyRates()

  await prisma.$transaction(
    Object.entries(rates).map(([symbol, rate]) =>
      prisma.currency.upsert({
        where: { symbol },
        create: { symbol, rate },
        update: { rate },
        select: { id: true },
      }),
    ),
  )
}
