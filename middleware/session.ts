import { Middleware } from 'next-api-middleware'
import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'

export const sessionMiddleware: Middleware = async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    req.session = session
    await next()
  } else {
    res.status(401).end('Unauthorized')
  }
}
