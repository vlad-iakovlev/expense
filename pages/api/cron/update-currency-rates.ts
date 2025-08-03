import { updateCurrencyRates } from '@/api/server/cron/index'
import { cronMiddleware } from '@/middleware/cron'
import { errorMiddleware } from '@/middleware/error'
import { restHandler } from '@/middleware/rest'

export default errorMiddleware(
  cronMiddleware(
    restHandler({
      post: updateCurrencyRates,
    }),
  ),
)
