import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRouter from '@/routes/auth/index.js'
import cronRouter from '@/routes/cron/index.js'
import invitesRouter from '@/routes/invites/index.js'
import syncRouter from '@/routes/sync/index.js'

const app = new Hono({ strict: false })

app.route('/auth', authRouter)
app.route('/invites', invitesRouter)
app.route('/sync', syncRouter)
app.route('/cron', cronRouter)

serve(app)
