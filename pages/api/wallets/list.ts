import { use } from 'next-api-middleware'
import { getWallets } from '../../../api/server/wallets.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { restHandler } from '../../../middleware/rest.ts'
import { sessionMiddleware } from '../../../middleware/session.ts'

export default use([errorMiddleware, sessionMiddleware])(
  restHandler({
    get: getWallets,
  })
)
