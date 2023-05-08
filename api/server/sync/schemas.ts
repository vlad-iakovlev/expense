import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId.ts'

export const performSyncBodySchema = z.object({
  lastTransactionId: z.string().refine(isValidObjectId).nullable(),

  updates: z
    .object({
      userGroups: z.array(
        z.object({
          id: z.string().refine(isValidObjectId),
          removed: z.boolean(),
        })
      ),

      groups: z.array(
        z.object({
          id: z.string().refine(isValidObjectId),
          removed: z.boolean(),
          name: z.string().min(1),
          defaultCurrencyId: z.string().refine(isValidObjectId),
        })
      ),

      wallets: z.array(
        z.object({
          id: z.string().refine(isValidObjectId),
          removed: z.boolean(),
          name: z.string().min(1),
          order: z.number().nullable(),
          currencyId: z.string().refine(isValidObjectId),
          // New value in groupId won't apply to existing wallets
          groupId: z.string().refine(isValidObjectId),
        })
      ),

      operations: z.array(
        z.object({
          id: z.string().refine(isValidObjectId),
          removed: z.boolean(),
          name: z.string().min(1),
          category: z.string().min(1),
          date: z.union([z.string().datetime(), z.date()]),
          incomeAmount: z.number(),
          expenseAmount: z.number(),
          incomeWalletId: z.string().refine(isValidObjectId).nullable(),
          expenseWalletId: z.string().refine(isValidObjectId).nullable(),
        })
      ),
    })
    .nullable(),
})
