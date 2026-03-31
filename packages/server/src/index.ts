import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { updateCurrencyRatesHandler } from './routes/updateCurrencyRates.js'

const app = new Hono()

app.get('/health', (c) => c.json({ ok: true }))
app.post('/cron/update-currency-rates', updateCurrencyRatesHandler)

const port = Number(process.env.PORT ?? '3001')

serve(
  {
    fetch: app.fetch,
    port,
  },
  () => {
    console.log(`Server running at http://localhost:${port}`)
  },
)
