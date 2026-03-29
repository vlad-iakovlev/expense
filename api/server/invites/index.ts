import { PrismaClient } from '@prisma/client'
import * as fns from 'date-fns'
import { v4 as uuid } from 'uuid'
import { HandledError } from '@/utils/server/HandledError'
import { AcceptInviteResponse, CreateInviteResponse } from './types'

const prisma = new PrismaClient()

export const createInvite = async (
  userId: string,
  groupId: string,
): Promise<CreateInviteResponse> => {
  const invite = await prisma.invite.create({
    data: {
      token: uuid(),
      expiresAt: fns.addDays(new Date(), 1),
      group: {
        connect: {
          id: groupId,
          removed: false,
          userGroups: {
            some: {
              removed: false,
              userId,
            },
          },
        },
      },
    },
  })

  return {
    token: invite.token,
    expiresAt: invite.expiresAt.toISOString(),
  }
}

export const acceptInvite = async (
  userId: string,
  token: string,
): Promise<AcceptInviteResponse> => {
  const { groupId } = await getInviteByToken(token)
  await joinGroup(userId, groupId)

  return { ok: true }
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
    throw HandledError.INVALID_INVITE(error)
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
    throw HandledError.CANNOT_JOIN_GROUP(error)
  }
}
