import { acceptInvite } from '@/api/server/invites/index'
import { acceptInviteBodySchema } from '@/api/server/invites/schemas'
import { auth } from '@/auth'
import { ERROR_TYPES } from '@/constants/errors'
import { toErrorResponse } from '@/utils/server/toErrorResponse'

export const POST = async (request: Request) => {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error(ERROR_TYPES.UNAUTHORIZED)

    const { token } = acceptInviteBodySchema.parse(await request.json())
    const response = await acceptInvite(session.user.id, token)

    return Response.json(response)
  } catch (error) {
    return toErrorResponse(error)
  }
}
