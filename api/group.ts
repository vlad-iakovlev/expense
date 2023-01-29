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
  const body = createGroupBodySchema.parse(req.body)

  const group = await req.prisma.group.create({
    data: {
      name: body.name,
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
  groupId: z.string().refine(isValidObjectId),
})

export const getGroup: NextApiHandler<GetGroupResponse> = async (req, res) => {
  const query = getGroupQuerySchema.parse(req.query)

  const group = await req.prisma.group.findFirst({
    where: {
      userIds: {
        has: req.session.user.id,
      },
      id: query.groupId,
    },
    select: groupSelect,
  })

  if (!group) {
    res.status(404).end('Not Found')
  } else {
    res.status(200).json({ group })
  }
}

export interface UpdateGroupBody {
  name: string
}

export interface UpdateGroupResponse {
  group: ClientGroup
}

const updateGroupQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

const updateGroupBodySchema = z.object({
  name: z.string().min(1),
})

export const updateGroup: NextApiHandler<UpdateGroupResponse> = async (
  req,
  res
) => {
  const query = updateGroupQuerySchema.parse(req.query)
  const body = updateGroupBodySchema.parse(req.body)

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
