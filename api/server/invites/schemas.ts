import { z } from 'zod'

export const createInviteBodySchema = z.object({
  groupId: z.string().uuid(),
})

export const acceptInviteBodySchema = z.object({
  token: z.string().uuid(),
})
