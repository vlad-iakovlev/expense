import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId'

export const getGroupQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export const createGroupBodySchema = z.object({
  name: z.string().min(1),
})

export const updateGroupQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export const updateGroupBodySchema = z.object({
  name: z.string().min(1),
})
