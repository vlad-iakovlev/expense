import { acceptInvite } from '@/api/server/invites/index'
import { errorMiddleware } from '@/middleware/error'
import { restHandler } from '@/middleware/rest'
import { sessionMiddleware } from '@/middleware/session'

export default errorMiddleware(
  sessionMiddleware(
    restHandler({
      post: acceptInvite,
    }),
  ),
)
