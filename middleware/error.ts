import { Middleware } from 'next-api-middleware'

export const errorMiddleware: Middleware = async (req, res, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error)
    res.status(500).end('Internal Server Error')
  }
}
