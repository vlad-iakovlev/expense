import { serve } from '@hono/node-server'
import { prometheus } from '@hono/prometheus'
import { Hono } from 'hono'
import authRouter from '@/routes/auth/index.js'
import cronRouter from '@/routes/cron/index.js'
import invitesRouter from '@/routes/invites/index.js'
import syncRouter from '@/routes/sync/index.js'

const app = new Hono({ strict: false })

const { printMetrics, registerMetrics } = prometheus({
  collectDefaultMetrics: true,
})

app.use('*', registerMetrics)
app.get('/metrics', printMetrics)

app.route('/api/auth', authRouter)
app.route('/api/invites', invitesRouter)
app.route('/api/sync', syncRouter)
app.route('/api/cron', cronRouter)

const server = serve(app)

const shutdown = () => {
  server.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
