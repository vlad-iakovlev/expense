import { use } from 'next-api-middleware'
import { createInvite } from '@/api/server/invites/index.js'
import { errorMiddleware } from '@/middleware/error.js'
import { restHandler } from '@/middleware/rest.js'
import { sessionMiddleware } from '@/middleware/session.js'

export default use([errorMiddleware, sessionMiddleware])(
  restHandler({
    post: createInvite,
  }),
)
