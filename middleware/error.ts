import { Middleware } from 'next-api-middleware'
import { ERROR_TYPES } from '@/constants/errors.js'

export const errorMiddleware: Middleware = async (req, res, next) => {
  try {
    await next()
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
