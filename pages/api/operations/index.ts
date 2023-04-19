import { use } from 'next-api-middleware'
import {
  createOperation,
  deleteOperation,
  getOperation,
  updateOperation,
} from '../../../api/server/operations.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { prismaMiddleware } from '../../../middleware/prisma.ts'
import { restHandler } from '../../../middleware/rest.ts'
import { sessionMiddleware } from '../../../middleware/session.ts'

export default use([errorMiddleware, sessionMiddleware, prismaMiddleware])(
  restHandler({
    get: getOperation,
    post: createOperation,
    put: updateOperation,
    delete: deleteOperation,
  })
)
