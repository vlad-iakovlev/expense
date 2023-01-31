import { NextApiHandler } from 'next'
import {
  CreateGroupResponse,
  GetGroupResponse,
  GetGroupsResponse,
  UpdateGroupResponse,
} from '../types/groups'
import {
  createGroupBodySchema,
  getGroupQuerySchema,
  updateGroupBodySchema,
} from './schemas/group'

export const select = {
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
    select,
  })

  res.status(200).json({ groups })
}

export const getGroup: NextApiHandler<GetGroupResponse> = async (req, res) => {
  const query = getGroupQuerySchema.parse(req.query)

  const group = await req.prisma.group.findFirstOrThrow({
    where: {
      id: query.groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
    select,
  })

  res.status(200).json({ group })
}

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
    select,
  })

  res.status(200).json({ group })
}

export const updateGroup: NextApiHandler<UpdateGroupResponse> = async (
  req,
  res
) => {
  const body = updateGroupBodySchema.parse(req.body)

  const group = await req.prisma.group.update({
    where: {
      id: body.groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
    data: {
      name: body.name,
    },
    select: select,
  })

  res.status(200).json({ group })
}
