import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId.ts'

export const getGroupQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export const createGroupBodySchema = z.object({
  name: z.string().min(1),
  defaultCurrencyId: z.string().refine(isValidObjectId),
})

export const updateGroupBodySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
  name: z.string().min(1).optional(),
  defaultCurrencyId: z.string().refine(isValidObjectId).optional(),
})

export const deleteGroupQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})
