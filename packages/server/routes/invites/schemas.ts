import { z } from 'zod'

export const createInviteBodySchema = z.object({
  groupId: z.uuid(),
})

export const createInviteResponseSchema = z.object({
  token: z.string(),
  expiresAt: z.iso.datetime(),
})

export const acceptInviteBodySchema = z.object({
  token: z.uuid(),
})

export const acceptInviteResponseSchema = z.object({
  ok: z.boolean(),
})
