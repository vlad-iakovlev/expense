import * as fns from 'date-fns'
import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { v4 as uuid } from 'uuid'
import { prisma } from '@/utils/prisma.js'
import { acceptInviteBodySchema, createInviteBodySchema } from './schemas.js'
import { AcceptInviteResponse, CreateInviteResponse } from './types.js'

export const handleAcceptInvite = async (c: Context) => {
  try {
    const { token } = acceptInviteBodySchema.parse(await c.req.json())

    // TODO: Add auth
    const userId = '123'

    const { groupId } = await getInviteByToken(token)
    await joinGroup(userId, groupId)

    return c.json<AcceptInviteResponse>({ ok: true })
  } catch (error) {
    if (error instanceof HTTPException) throw error

    console.error(error)
    throw new HTTPException()
  }
}

export const handleCreateInvite = async (c: Context) => {
  try {
    const { groupId } = createInviteBodySchema.parse(await c.req.json())

    // TODO: Add auth
    const userId = '123'

    const invite = await createInvite(groupId, userId)

    return c.json<CreateInviteResponse>({
      token: invite.token,
      expiresAt: invite.expiresAt.toISOString(),
    })
  } catch (error) {
    if (error instanceof HTTPException) throw error

    console.error(error)
    throw new HTTPException()
  }
}

const createInvite = async (groupId: string, userId: string) =>
  await prisma.invite.create({
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
    console.error('Error getting invite by token:', error)
    throw new HTTPException(400, { message: 'Invalid invite' })
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
    console.error('Error joining group:', error)
    throw new HTTPException(400, { message: 'Cannot join group' })
  }
}
