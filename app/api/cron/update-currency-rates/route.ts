import { updateCurrencyRates } from '@/api/server/cron/index'
import { ERROR_TYPES } from '@/constants/errors'
import { toErrorResponse } from '@/utils/server/toErrorResponse'

export const POST = async (request: Request) => {
  try {
    if (
      !process.env.CRON_SECRET ||
      request.headers.get('authorization') !==
        `Bearer ${process.env.CRON_SECRET}`
    ) {
      throw new Error(ERROR_TYPES.UNAUTHORIZED)
    }

    const response = await updateCurrencyRates()

    return Response.json(response)
  } catch (error) {
    return toErrorResponse(error)
  }
}
