import { serve } from '@hono/node-server'
import { prometheus } from '@hono/prometheus'
import { Hono } from 'hono'
import { Registry } from 'prom-client'
import { initCurrencyRatesCron } from '@/cron/currencyRates.js'
import authRouter from '@/routes/auth/index.js'
import invitesRouter from '@/routes/invites/index.js'
import syncRouter from '@/routes/sync/index.js'

const registry = new Registry()

const { printMetrics, registerMetrics } = prometheus({
  collectDefaultMetrics: true,
  registry,
})

initCurrencyRatesCron(registry)

const app = new Hono({ strict: false })

app.use('*', registerMetrics)
app.get('/metrics', printMetrics)

app.route('/api/auth', authRouter)
app.route('/api/invites', invitesRouter)
app.route('/api/sync', syncRouter)

const server = serve(app)

const shutdown = () => {
  server.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
