import { z } from 'zod'
import { acceptInviteBodySchema, createInviteBodySchema } from './schemas.ts'

export type CreateInviteBody = z.infer<typeof createInviteBodySchema>

export interface CreateInviteResponse {
  token: string
  expiresAt: string | Date
}

export type AcceptInviteBody = z.infer<typeof acceptInviteBodySchema>

export interface AcceptInviteResponse {
  ok: true
}
