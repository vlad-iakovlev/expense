import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId'

export const getOperationsQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId).optional(),
  walletId: z.string().refine(isValidObjectId).optional(),
  skip: z.coerce.number().nonnegative().optional(),
  take: z.coerce.number().positive().max(11).default(11).optional(),
})

export const getOperationQuerySchema = z.object({
  operationId: z.string().refine(isValidObjectId),
})

export const createOperationBodySchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  date: z.string().datetime(),
  incomeAmount: z.number(),
  expenseAmount: z.number(),
  incomeWalletId: z.string().refine(isValidObjectId).or(z.null()),
  expenseWalletId: z.string().refine(isValidObjectId).or(z.null()),
})

export const updateOperationBodySchema = z.object({
  operationId: z.string().refine(isValidObjectId),
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  date: z.string().datetime().optional(),
  incomeAmount: z.number().optional(),
  expenseAmount: z.number().optional(),
  incomeWalletId: z.string().refine(isValidObjectId).or(z.null()).optional(),
  expenseWalletId: z.string().refine(isValidObjectId).or(z.null()).optional(),
})

export const deleteOperationQuerySchema = z.object({
  operationId: z.string().refine(isValidObjectId),
})
