import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { handleUpdateCurrencyRates } from '@/routes/cron/index.js'
import {
  handleAcceptInvite,
  handleCreateInvite,
} from '@/routes/invites/index.js'
import { handleSync } from '@/routes/sync/index.js'

const app = new Hono()

app.post('/cron/update-currency-rates', handleUpdateCurrencyRates)
app.post('/invites/accept', handleAcceptInvite)
app.post('/invites/create', handleCreateInvite)
app.post('/sync', handleSync)

serve(app)
