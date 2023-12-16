import { use } from 'next-api-middleware'
import { performSync } from '../../api/server/sync/index.js'
import { errorMiddleware } from '../../middleware/error.js'
import { restHandler } from '../../middleware/rest.js'
import { sessionMiddleware } from '../../middleware/session.js'

export default use([errorMiddleware, sessionMiddleware])(
  restHandler({
    post: performSync,
  }),
)
