import { createInvite } from '@/api/server/invites/index'
import { createInviteBodySchema } from '@/api/server/invites/schemas'
import { auth } from '@/auth'
import { ERROR_TYPES } from '@/constants/errors'
import { toErrorResponse } from '@/utils/server/toErrorResponse'

export const POST = async (request: Request) => {
  try {
    const session = await auth()
    if (!session?.user?.id) throw new Error(ERROR_TYPES.UNAUTHORIZED)

    const { groupId } = createInviteBodySchema.parse(await request.json())
    const response = await createInvite(session.user.id, groupId)

    return Response.json(response)
  } catch (error) {
    return toErrorResponse(error)
  }
}
