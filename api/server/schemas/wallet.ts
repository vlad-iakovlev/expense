import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId'

export const getWalletsQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export const getWalletQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
  walletId: z.string().refine(isValidObjectId),
})

export const createWalletQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export const createWalletBodySchema = z.object({
  name: z.string().min(1),
  currencyId: z.string().refine(isValidObjectId),
})

export const updateWalletQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
  walletId: z.string().refine(isValidObjectId),
})

export const updateWalletBodySchema = z.object({
  name: z.string().min(1).optional(),
  currencyId: z.string().refine(isValidObjectId).optional(),
})
