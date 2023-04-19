import { use } from 'next-api-middleware'
import {
  createWallet,
  deleteWallet,
  getWallet,
  updateWallet,
} from '../../../api/server/wallets.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { prismaMiddleware } from '../../../middleware/prisma.ts'
import { restHandler } from '../../../middleware/rest.ts'
import { sessionMiddleware } from '../../../middleware/session.ts'

export default use([errorMiddleware, sessionMiddleware, prismaMiddleware])(
  restHandler({
    get: getWallet,
    post: createWallet,
    put: updateWallet,
    delete: deleteWallet,
  })
)
