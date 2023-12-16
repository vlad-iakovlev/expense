import { use } from 'next-api-middleware'
import { updateCurrencyNames } from '../../../api/server/cron/updateCurrencyNames.js'
import { cronMiddleware } from '../../../middleware/cron.js'
import { errorMiddleware } from '../../../middleware/error.js'
import { restHandler } from '../../../middleware/rest.js'

export default use([errorMiddleware, cronMiddleware])(
  restHandler({
    post: updateCurrencyNames,
  }),
)
