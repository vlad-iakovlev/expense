import { z } from 'zod'

export const createInviteBodySchema = z.object({
  groupId: z.string().uuid(),
})

export const createInviteResponseSchema = z.object({
  token: z.string(),
  expiresAt: z.string().datetime(),
})

export const acceptInviteBodySchema = z.object({
  token: z.string().uuid(),
})

export const acceptInviteResponseSchema = z.object({
  ok: z.boolean(),
})
