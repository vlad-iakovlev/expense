import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/health', (c) => c.json({ ok: true }))
app.get('/', (c) => c.text('Expense server is running'))

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
