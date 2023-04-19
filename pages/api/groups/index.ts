import { use } from 'next-api-middleware'
import {
  createGroup,
  deleteGroup,
  getGroup,
  updateGroup,
} from '../../../api/server/groups.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { restHandler } from '../../../middleware/rest.ts'
import { sessionMiddleware } from '../../../middleware/session.ts'

export default use([errorMiddleware, sessionMiddleware])(
  restHandler({
    get: getGroup,
    post: createGroup,
    put: updateGroup,
    delete: deleteGroup,
  })
)
