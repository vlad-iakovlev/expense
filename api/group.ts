import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientGroup } from '../models/group'
import { isValidObjectId } from '../utils/isValidObjectId'

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

export interface CreateGroupBody {
  name: string
}

export interface CreateGroupResponse {
  group: ClientGroup
}

const createGroupBodySchema = z.object({
  name: z.string().min(1),
})

export const createGroup: NextApiHandler<CreateGroupResponse> = async (
  req,
  res
) => {
  const data = createGroupBodySchema.parse(req.body)

  const group = await req.prisma.group.create({
    data: {
      name: data.name,
      userIds: req.session.user.id,
    },
    select: groupSelect,
  })

  res.status(200).json({ group })
}

export interface GetGroupResponse {
  group: ClientGroup
}

const getGroupQuerySchema = z.object({
  id: z.string().refine(isValidObjectId),
})

export const getGroup: NextApiHandler<GetGroupResponse> = async (req, res) => {
  const data = getGroupQuerySchema.parse(req.query)

  const group = await req.prisma.group.findFirst({
    where: {
      userIds: {
        has: req.session.user.id,
      },
      id: data.id,
    },
    select: groupSelect,
  })

  if (!group) {
    res.status(404).end('Not Found')
  } else {
    res.status(200).json({ group })
  }
}
