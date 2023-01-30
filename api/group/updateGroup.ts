import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientGroup } from '../../models/group'
import { isValidObjectId } from '../../utils/isValidObjectId'
import { groupSelect } from './constants'

const querySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

const bodySchema = z.object({
  name: z.string().min(1),
})

export type UpdateGroupBody = z.infer<typeof bodySchema>

export interface UpdateGroupResponse {
  group: ClientGroup
}

export const updateGroup: NextApiHandler<UpdateGroupResponse> = async (
  req,
  res
) => {
  const query = querySchema.parse(req.query)
  const body = bodySchema.parse(req.body)

  const group = await req.prisma.group.update({
    where: {
      id: query.groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
    data: {
      name: body.name,
    },
    select: groupSelect,
  })

  res.status(200).json({ group })
}
