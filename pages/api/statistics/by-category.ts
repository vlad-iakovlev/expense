import { use } from 'next-api-middleware'
import { getStatisticsByCategory } from '../../../api/server/statistics'
import { errorMiddleware } from '../../../middleware/error'
import { prismaMiddleware } from '../../../middleware/prisma'
import { restHandler } from '../../../middleware/rest'
import { sessionMiddleware } from '../../../middleware/session'

export default use([errorMiddleware, sessionMiddleware, prismaMiddleware])(
  restHandler({
    get: getStatisticsByCategory,
  })
)
