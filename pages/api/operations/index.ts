import { use } from 'next-api-middleware'
import {
  createOperation,
  getOperation,
  updateOperation,
} from '../../../api/server/operations'
import { errorMiddleware } from '../../../middleware/error'
import { prismaMiddleware } from '../../../middleware/prisma'
import { restHandler } from '../../../middleware/rest'
import { sessionMiddleware } from '../../../middleware/session'

export default use([errorMiddleware, sessionMiddleware, prismaMiddleware])(
  restHandler({
    get: getOperation,
    post: createOperation,
    put: updateOperation,
  })
)
