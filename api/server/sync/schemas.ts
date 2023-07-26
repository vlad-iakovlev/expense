import { z } from 'zod'

export const performSyncBodySchema = z.object({
  lastTransactionId: z.string().uuid().nullable(),

  updates: z
    .object({
      userGroups: z.array(
        z.object({
          id: z.string().uuid(),
          removed: z.boolean(),
        }),
      ),

      groups: z.array(
        z.object({
          id: z.string().uuid(),
          removed: z.boolean(),
          name: z.string().min(1),
          defaultCurrencyId: z.string().uuid(),
        }),
      ),

      wallets: z.array(
        z.object({
          id: z.string().uuid(),
          removed: z.boolean(),
          name: z.string().min(1),
          order: z.number().nullable(),
          currencyId: z.string().uuid(),
          // New value in groupId won't apply to existing wallets
          groupId: z.string().uuid(),
        }),
      ),

      operations: z.array(
        z.object({
          id: z.string().uuid(),
          removed: z.boolean(),
          name: z.string().min(1),
          category: z.string().min(1),
          date: z.union([z.string().datetime(), z.date()]),
          incomeAmount: z.string().regex(/^\d+(\.\d+)?$/),
          expenseAmount: z.string().regex(/^\d+(\.\d+)?$/),
          incomeWalletId: z.string().uuid().nullable(),
          expenseWalletId: z.string().uuid().nullable(),
        }),
      ),
    })
    .nullable(),
})
