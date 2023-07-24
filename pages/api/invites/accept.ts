import { use } from 'next-api-middleware'
import { acceptInvite } from '../../../api/server/invites/index.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { restHandler } from '../../../middleware/rest.ts'
import { sessionMiddleware } from '../../../middleware/session.ts'

export default use([errorMiddleware, sessionMiddleware])(
  restHandler({
    put: acceptInvite,
  }),
)
