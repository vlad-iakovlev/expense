import { headers } from 'next/headers'
import { createInvite } from '@/api/server/invites/index'
import { createInviteBodySchema } from '@/api/server/invites/schemas'
import { auth } from '@/auth'
import { HandledError } from '@/utils/server/HandledError'

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) throw HandledError.UNAUTHORIZED()

    const { groupId } = createInviteBodySchema.parse(await request.json())
    const response = await createInvite(session.user.id, groupId)

    return Response.json(response)
  } catch (error) {
    if (error instanceof HandledError) return error.response
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
