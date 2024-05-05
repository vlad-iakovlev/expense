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
          // New value in groupId won't be applied to existing wallets
          groupId: z.string().uuid(),
        }),
      ),

      operations: z.array(
        z.object({
          id: z.string().uuid(),
          removed: z.boolean(),
          name: z.string().min(1),
          category: z.string().min(1),
          date: z.string().datetime(),
          incomeAmount: z.string().regex(/^\d+(\.\d+)?$/),
          expenseAmount: z.string().regex(/^\d+(\.\d+)?$/),
          incomeWalletId: z.string().uuid().nullable(),
          expenseWalletId: z.string().uuid().nullable(),
        }),
      ),
    })
    .nullable(),
})

export const performSyncResponseSchema = z.object({
  lastTransactionId: z.string(),

  updates: z.object({
    currencies: z.array(
      z.object({
        id: z.string(),
        symbol: z.string(),
        rate: z.number(),
      }),
    ),

    users: z.array(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        image: z.string().nullable(),
      }),
    ),

    userGroups: z.array(
      z.object({
        id: z.string(),
        removed: z.boolean(),
        userId: z.string(),
        groupId: z.string(),
      }),
    ),

    groups: z.array(
      z.object({
        id: z.string(),
        removed: z.boolean(),
        name: z.string(),
        defaultCurrencyId: z.string(),
      }),
    ),

    wallets: z.array(
      z.object({
        id: z.string(),
        createdAt: z.string(),
        removed: z.boolean(),
        name: z.string(),
        order: z.number().nullable(),
        currencyId: z.string(),
        groupId: z.string(),
      }),
    ),

    operations: z.array(
      z.object({
        id: z.string(),
        removed: z.boolean(),
        name: z.string(),
        category: z.string(),
        date: z.string(),
        incomeAmount: z.string(),
        expenseAmount: z.string(),
        incomeWalletId: z.string().nullable(),
        expenseWalletId: z.string().nullable(),
      }),
    ),
  }),
})
