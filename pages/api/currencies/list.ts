import { use } from 'next-api-middleware'
import { getCurrencies } from '../../../api/server/currencies.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { prismaMiddleware } from '../../../middleware/prisma.ts'
import { restHandler } from '../../../middleware/rest.ts'
import { sessionMiddleware } from '../../../middleware/session.ts'

export default use([errorMiddleware, sessionMiddleware, prismaMiddleware])(
  restHandler({
    get: getCurrencies,
  })
)
