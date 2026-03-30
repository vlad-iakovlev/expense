import { headers } from 'next/headers'
import { acceptInvite } from '@/api/server/invites/index'
import { acceptInviteBodySchema } from '@/api/server/invites/schemas'
import { auth } from '@/auth'
import { HandledError } from '@/utils/server/HandledError'

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user.id) throw HandledError.UNAUTHORIZED()

    const { token } = acceptInviteBodySchema.parse(await request.json())
    const response = await acceptInvite(session.user.id, token)

    return Response.json(response)
  } catch (error) {
    if (error instanceof HandledError) return error.response
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
