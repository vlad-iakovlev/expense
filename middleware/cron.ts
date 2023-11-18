import assert from 'assert'
import { Middleware } from 'next-api-middleware'

export const cronMiddleware: Middleware = async (req, res, next) => {
  assert(process.env.CRON_SECRET, 'CRON_SECRET is not defined')

  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).end('Unauthorized')
    return
  }

  await next()
}
