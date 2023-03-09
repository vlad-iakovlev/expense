import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId'

export const getStatisticsByCategoryQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId).optional(),
  walletId: z.string().refine(isValidObjectId).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})
