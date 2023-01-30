import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientGroup } from '../../models/group'
import { isValidObjectId } from '../../utils/isValidObjectId'
import { groupSelect } from './constants'

const querySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export interface GetGroupResponse {
  group: ClientGroup
}

export const getGroup: NextApiHandler<GetGroupResponse> = async (req, res) => {
  const query = querySchema.parse(req.query)

  const group = await req.prisma.group.findFirstOrThrow({
    where: {
      id: query.groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
    select: groupSelect,
  })

  res.status(200).json({ group })
}
