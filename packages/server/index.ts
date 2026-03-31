import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { updateCurrencyRates } from './routes/cron/index.js'

const app = new Hono()

app.post('/cron/update-currency-rates', updateCurrencyRates)

serve(app)
