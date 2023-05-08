import * as fns from 'date-fns'
import { NextApiHandler } from 'next'
import { v4 as uuid } from 'uuid'
import { prisma } from '../../../utils/server/prisma.ts'
import { acceptInviteBodySchema, createInviteBodySchema } from './schemas.ts'
import { AcceptInviteResponse, CreateInviteResponse } from './types.ts'

export const createInvite: NextApiHandler<CreateInviteResponse> = async (
  req,
  res
) => {
  const body = createInviteBodySchema.parse(req.body)

  const { token, expiresAt } = await prisma.invite.create({
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
              userId: req.session.user.id,
            },
          },
        },
      },
    },
    select: {
      token: true,
      expiresAt: true,
    },
  })

  res.status(200).json({ token, expiresAt })
}

export const acceptInvite: NextApiHandler<AcceptInviteResponse> = async (
  req,
  res
) => {
  const body = acceptInviteBodySchema.parse(req.body)

  const invite = await prisma.invite.update({
    where: {
      accepted: false,
      token: body.token,
      expiresAt: { gt: new Date() },
    },
    data: {
      accepted: true,
    },
    select: {
      group: {
        select: {
          id: true,
        },
      },
    },
  })

  await prisma.userGroup.create({
    data: {
      user: {
        connect: {
          id: req.session.user.id,
        },
      },
      group: {
        connect: {
          id: invite.group.id,
          removed: false,
        },
      },
      transactions: {
        create: {
          completedAt: new Date(),
        },
      },
    },
    select: { id: true },
  })

  res.status(200).json({ ok: true })
}
