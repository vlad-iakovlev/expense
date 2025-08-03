import assert from 'assert'
import { NextApiHandler } from 'next'

export const cronMiddleware =
  (next: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    assert(process.env.CRON_SECRET, 'CRON_SECRET is not defined')

    if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
      res.status(401).end('Unauthorized')
      return
    }

    await next(req, res)
  }
