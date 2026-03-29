import { updateCurrencyRates } from '@/api/server/cron/index'
import { HandledError } from '@/utils/server/HandledError'

export const POST = async (request: Request) => {
  try {
    if (
      !process.env.CRON_SECRET ||
      request.headers.get('authorization') !==
        `Bearer ${process.env.CRON_SECRET}`
    ) {
      throw HandledError.UNAUTHORIZED()
    }

    const response = await updateCurrencyRates()

    return Response.json(response)
  } catch (error) {
    if (error instanceof HandledError) return error.response
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
