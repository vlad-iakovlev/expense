import { NextApiHandler } from 'next'

type RestMiddlewareHandlers = Partial<
  Record<'post' | 'get' | 'put' | 'patch' | 'delete', NextApiHandler>
>

export const restHandler = (
  handlers: RestMiddlewareHandlers
): NextApiHandler => {
  return async (req, res) => {
    const handler =
      handlers[req.method?.toLowerCase() as keyof RestMiddlewareHandlers]

    if (handler) {
      await handler(req, res)
    } else {
      res.status(405).end('Method Not Allowed')
    }
  }
}
