import { headers } from 'next/headers'
import { performSync } from '@/api/server/sync/index'
import { performSyncBodySchema } from '@/api/server/sync/schemas'
import { auth } from '@/auth'
import { HandledError } from '@/utils/server/HandledError'

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user.id) throw HandledError.UNAUTHORIZED()

    const { updates, lastTransactionId } = performSyncBodySchema.parse(
      await request.json(),
    )

    const response = await performSync(
      session.user.id,
      updates,
      lastTransactionId ?? undefined,
    )

    return Response.json(response)
  } catch (error) {
    if (error instanceof HandledError) return error.response
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
