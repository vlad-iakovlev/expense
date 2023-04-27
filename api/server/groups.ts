import { NextApiHandler } from 'next'
import { prisma } from '../../utils/server/prisma.ts'
import {
  CreateGroupResponse,
  DeleteGroupResponse,
  GetGroupResponse,
  GetGroupsResponse,
  UpdateGroupResponse,
} from '../types/groups.ts'
import {
  createGroupBodySchema,
  deleteGroupQuerySchema,
  getGroupQuerySchema,
  updateGroupBodySchema,
} from './schemas/groups.ts'
import { groupSelector } from './selectors/index.ts'

export const getGroups: NextApiHandler<GetGroupsResponse> = async (
  req,
  res
) => {
  const groups = await prisma.group.findMany({
    where: {
      userIds: {
        has: req.session.user.id,
      },
    },
    orderBy: {
      name: 'asc',
    },
    select: groupSelector,
  })

  res.status(200).json({ groups })
}

export const getGroup: NextApiHandler<GetGroupResponse> = async (req, res) => {
  const query = getGroupQuerySchema.parse(req.query)

  const group = await prisma.group.findFirstOrThrow({
    where: {
      id: query.groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
    select: groupSelector,
  })

  res.status(200).json({ group })
}

export const createGroup: NextApiHandler<CreateGroupResponse> = async (
  req,
  res
) => {
  const body = createGroupBodySchema.parse(req.body)

  const group = await prisma.group.create({
    data: {
      name: body.name,
      defaultCurrencyId: body.defaultCurrencyId,
      userIds: req.session.user.id,
    },
    select: {
      id: true,
    },
  })

  res.status(200).json({ groupId: group.id })
}

export const updateGroup: NextApiHandler<UpdateGroupResponse> = async (
  req,
  res
) => {
  const body = updateGroupBodySchema.parse(req.body)

  await prisma.group.update({
    where: {
      id: body.groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
    data: {
      name: body.name,
      defaultCurrencyId: body.defaultCurrencyId,
    },
    select: {
      id: true,
    },
  })

  res.status(200).json({ ok: true })
}

export const deleteGroup: NextApiHandler<DeleteGroupResponse> = async (
  req,
  res
) => {
  const query = deleteGroupQuerySchema.parse(req.query)

  await prisma.group.delete({
    where: {
      id: query.groupId,
      userIds: {
        has: req.session.user.id,
      },
    },
  })

  res.status(200).json({ ok: true })
}
