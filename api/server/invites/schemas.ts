import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId.ts'

export const createInviteBodySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export const acceptInviteBodySchema = z.object({
  token: z.string().uuid(),
})
