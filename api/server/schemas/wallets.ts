import { z } from 'zod'
import { isValidObjectId } from '../../../utils/isValidObjectId'

export const getWalletsQuerySchema = z.object({
  groupId: z.string().refine(isValidObjectId).optional(),
})

export const getWalletQuerySchema = z.object({
  walletId: z.string().refine(isValidObjectId),
})

export const createWalletBodySchema = z.object({
  name: z.string().min(1),
  currencyId: z.string().refine(isValidObjectId),
  groupId: z.string().refine(isValidObjectId),
})

export const updateWalletBodySchema = z.object({
  walletId: z.string().refine(isValidObjectId),
  name: z.string().min(1).optional(),
  currencyId: z.string().refine(isValidObjectId).optional(),
  groupId: z.string().refine(isValidObjectId).optional(),
})

export const deleteWalletQuerySchema = z.object({
  walletId: z.string().refine(isValidObjectId),
})
