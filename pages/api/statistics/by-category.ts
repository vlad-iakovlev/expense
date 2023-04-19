import { use } from 'next-api-middleware'
import { getStatisticsByCategory } from '../../../api/server/statistics.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { restHandler } from '../../../middleware/rest.ts'
import { sessionMiddleware } from '../../../middleware/session.ts'

export default use([errorMiddleware, sessionMiddleware])(
  restHandler({
    get: getStatisticsByCategory,
  })
)
