import { use } from 'next-api-middleware'
import { updateCurrencyRates } from '../../../api/server/cron/updateCurrencyRates.js'
import { cronMiddleware } from '../../../middleware/cron.js'
import { errorMiddleware } from '../../../middleware/error.js'
import { restHandler } from '../../../middleware/rest.js'

export default use([errorMiddleware, cronMiddleware])(
  restHandler({
    post: updateCurrencyRates,
  }),
)
