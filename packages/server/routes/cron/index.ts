import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { prisma } from '@expense/prisma'
import { errorMiddleware } from '@/middlewares/error.js'

const fetchCurrencyRates = async () => {
  if (!process.env.EXCHANGE_RATES_API_KEY) {
    throw new Error('EXCHANGE_RATES_API_KEY is not set')
  }

  const fetchResult = await fetch(
    'https://api.apilayer.com/exchangerates_data/latest?base=USD',
    { headers: { apikey: process.env.EXCHANGE_RATES_API_KEY } },
  )

  return (await fetchResult.json()) as {
    base: string
    date: string
    rates: Record<string, number>
    success: boolean
    timestamp: number
  }
}

const router = new Hono({ strict: false })

router.use(
  errorMiddleware,
  bearerAuth({ token: process.env.CRON_SECRET ?? '' }),
)

router.post('/update-currency-rates', async (c) => {
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

  return c.json({ ok: true })
})

export default router
