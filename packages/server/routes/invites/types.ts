import { z } from 'zod'
import {
  acceptInviteBodySchema,
  acceptInviteResponseSchema,
  createInviteBodySchema,
  createInviteResponseSchema,
} from './schemas.js'

export type CreateInviteBody = z.infer<typeof createInviteBodySchema>

export type CreateInviteResponse = z.infer<typeof createInviteResponseSchema>

export type AcceptInviteBody = z.infer<typeof acceptInviteBodySchema>

export type AcceptInviteResponse = z.infer<typeof acceptInviteResponseSchema>
