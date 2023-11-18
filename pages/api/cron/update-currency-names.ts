import { use } from 'next-api-middleware'
import { updateCurrencyNames } from '../../../api/server/cron/updateCurrencyNames.ts'
import { cronMiddleware } from '../../../middleware/cron.ts'
import { errorMiddleware } from '../../../middleware/error.ts'
import { restHandler } from '../../../middleware/rest.ts'

export default use([errorMiddleware, cronMiddleware])(
  restHandler({
    post: updateCurrencyNames,
  }),
)
