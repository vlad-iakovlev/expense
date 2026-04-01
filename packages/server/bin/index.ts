import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRouter from '@/routes/auth/index.js'
import cronRouter from '@/routes/cron/index.js'
import invitesRouter from '@/routes/invites/index.js'
import syncRouter from '@/routes/sync/index.js'

const app = new Hono({ strict: false })

app.route('/api/auth', authRouter)
app.route('/api/invites', invitesRouter)
app.route('/api/sync', syncRouter)
app.route('/api/cron', cronRouter)

serve(app)
