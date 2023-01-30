import { use } from 'next-api-middleware'
import { getWallets } from '../../../../api/wallet'
import { errorMiddleware } from '../../../../middleware/error'
import { prismaMiddleware } from '../../../../middleware/prisma'
import { restHandler } from '../../../../middleware/rest'
import { sessionMiddleware } from '../../../../middleware/session'

export default use([errorMiddleware, sessionMiddleware, prismaMiddleware])(
  restHandler({
    get: getWallets,
  })
)
