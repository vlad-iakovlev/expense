import { NextApiHandler } from 'next'
import { ERROR_TYPES } from '@/constants/errors'

export const errorMiddleware =
  (next: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      await next(req, res)
    } catch (error) {
      if (
        error instanceof Error &&
        (Object.values(ERROR_TYPES) as string[]).includes(error.message)
      ) {
        res.status(400).end(error.message)
        return
      }

      console.error(error)
      res.status(500).end('Internal Server Error')
    }
  }
