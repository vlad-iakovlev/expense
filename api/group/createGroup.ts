import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientGroup } from '../../models/group'
import { groupSelect } from './constants'

const bodySchema = z.object({
  name: z.string().min(1),
})

export type CreateGroupBody = z.infer<typeof bodySchema>

export interface CreateGroupResponse {
  group: ClientGroup
}

export const createGroup: NextApiHandler<CreateGroupResponse> = async (
  req,
  res
) => {
  const body = bodySchema.parse(req.body)

  const group = await req.prisma.group.create({
    data: {
      name: body.name,
      userIds: req.session.user.id,
    },
    select: groupSelect,
  })

  res.status(200).json({ group })
}
