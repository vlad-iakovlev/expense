import { NextApiHandler } from 'next'
import { auth } from '@/auth'

export const sessionMiddleware =
  (next: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    const session = await auth(req, res)
    if (!session) {
      res.status(401).end('Unauthorized')
      return
    }

    req.session = session
    await next(req, res)
  }
