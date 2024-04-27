import { Middleware } from 'next-api-middleware'
import { auth } from '../auth.js'

export const sessionMiddleware: Middleware = async (req, res, next) => {
  const session = await auth(req, res)
  if (!session) {
    res.status(401).end('Unauthorized')
    return
  }

  req.session = session
  await next()
}
