import { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { AuthType, auth } from '@/auth.js'

export const authMiddleware = async (
  c: Context<{ Variables: AuthType }>,
  next: Next,
) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  if (!session) throw new HTTPException(401)

  c.set('session', session)
  await next()
}
