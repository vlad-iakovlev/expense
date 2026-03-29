import { performSync } from '@/api/server/sync/index'
import { performSyncBodySchema } from '@/api/server/sync/schemas'
import { auth } from '@/auth'
import { ERROR_TYPES } from '@/constants/errors'
import { toErrorResponse } from '@/utils/server/toErrorResponse'

export const POST = async (request: Request) => {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error(ERROR_TYPES.UNAUTHORIZED)

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
    return toErrorResponse(error)
  }
}
