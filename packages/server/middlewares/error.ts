import { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const errorMiddleware = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof HTTPException) throw error

    console.error('Unhandled error:', error)
    throw new HTTPException()
  }
}
