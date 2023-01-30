import { NextApiHandler } from 'next'
import { ClientGroup } from '../../models/group'

const groupSelect = {
  id: true,
  name: true,
  users: {
    select: {
      id: true,
      image: true,
      name: true,
    },
  },
}

export interface GetGroupsResponse {
  groups: ClientGroup[]
}

export const getGroups: NextApiHandler<GetGroupsResponse> = async (
  req,
  res
) => {
  const groups = await req.prisma.group.findMany({
    where: {
      userIds: {
        has: req.session.user.id,
      },
    },
    select: groupSelect,
  })

  res.status(200).json({ groups })
}
