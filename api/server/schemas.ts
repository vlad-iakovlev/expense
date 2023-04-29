import { z } from 'zod'
import { isValidObjectId } from '../../utils/isValidObjectId.ts'

export const performSyncBodySchema = z.object({
  groups: z.array(
    z.object({
      id: z.string().refine(isValidObjectId),
      name: z.string().min(1),
      removed: z.boolean(),
      defaultCurrencyId: z.string().refine(isValidObjectId),
    })
  ),

  wallets: z.array(
    z.object({
      id: z.string().refine(isValidObjectId),
      name: z.string().min(1),
      order: z.number().nullable(),
      removed: z.boolean(),
      currencyId: z.string().refine(isValidObjectId),
      groupId: z.string().refine(isValidObjectId),
    })
  ),

  operations: z.array(
    z.object({
      id: z.string().refine(isValidObjectId),
      name: z.string().min(1),
      category: z.string().min(1),
      date: z.union([z.string().datetime(), z.date()]),
      incomeAmount: z.number(),
      expenseAmount: z.number(),
      removed: z.boolean(),
      incomeWalletId: z.string().refine(isValidObjectId).nullable(),
      expenseWalletId: z.string().refine(isValidObjectId).nullable(),
    })
  ),

  syncedAt: z.union([z.string().datetime(), z.date()]).nullable(),
})
