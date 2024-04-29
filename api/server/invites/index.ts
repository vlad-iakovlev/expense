import { PrismaClient } from '@prisma/client'
import assert from 'assert'
import * as fns from 'date-fns'
import { NextApiHandler } from 'next'
import { v4 as uuid } from 'uuid'
import { ERROR_TYPES } from '@/constants/errors.js'
import { getHandledError } from '@/utils/server/getHandledError.js'
import { acceptInviteBodySchema, createInviteBodySchema } from './schemas.js'
import { AcceptInviteResponse, CreateInviteResponse } from './types.js'

const prisma = new PrismaClient()

export const createInvite: NextApiHandler<CreateInviteResponse> = async (
  req,
  res,
) => {
  const body = createInviteBodySchema.parse(req.body)

  const invite = await prisma.invite.create({
    data: {
      token: uuid(),
      expiresAt: fns.addDays(new Date(), 1),
      group: {
        connect: {
          id: body.groupId,
          removed: false,
          userGroups: {
            some: {
              removed: false,
              userId: req.session.user?.id,
            },
          },
        },
      },
    },
  })

  res.status(200).json({
    token: invite.token,
    expiresAt: invite.expiresAt.toISOString(),
  })
}

export const acceptInvite: NextApiHandler<AcceptInviteResponse> = async (
  req,
  res,
) => {
  assert(req.session.user?.id, 'User id is required')

  const body = acceptInviteBodySchema.parse(req.body)

  const invite = await getInviteByToken(body.token)

  await joinGroup(req.session.user.id, invite.groupId)

  res.status(200).json({ ok: true })
}

const getInviteByToken = async (token: string) => {
  try {
    return await prisma.invite.update({
      where: {
        accepted: false,
        token: token,
        expiresAt: { gt: new Date() },
      },
      data: {
        accepted: true,
      },
    })
  } catch (error) {
    throw getHandledError(ERROR_TYPES.INVALID_INVITE, error)
  }
}

const joinGroup = async (userId: string, groupId: string) => {
  try {
    await prisma.userGroup.upsert({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
      create: {
        user: { connect: { id: userId } },
        group: { connect: { id: groupId } },
        transactions: { create: { completedAt: new Date() } },
      },
      update: {
        removed: false,
        transactions: { create: { completedAt: new Date() } },
      },
      select: { id: true },
    })
  } catch (error) {
    throw getHandledError(ERROR_TYPES.CANNOT_JOIN_GROUP, error)
  }
}
