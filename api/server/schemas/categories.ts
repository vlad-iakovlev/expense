import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId.ts'

export const getCategoriesQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId).optional(),
  walletId: z.string().refine(isValidObjectId).optional(),
})

export const renameCategoryBodySchema = z.object({
  groupId: z.string().refine(isValidObjectId).optional(),
  walletId: z.string().refine(isValidObjectId).optional(),
  category: z.string().min(1),
  name: z.string().min(1),
})
