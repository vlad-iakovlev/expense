import { Hono } from 'hono'
import { AuthType, auth } from '@/auth.js'

const router = new Hono<{ Bindings: AuthType }>({ strict: false })
router.on(['POST', 'GET'], '*', (c) => auth.handler(c.req.raw))

export default router
