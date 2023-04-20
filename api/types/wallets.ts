import { Wallet } from '@prisma/client'
import { z } from 'zod'
import {
  createWalletBodySchema,
  deleteWalletQuerySchema,
  getWalletQuerySchema,
  getWalletsQuerySchema,
  setWalletsOrderBodySchema,
  updateWalletBodySchema,
} from '../server/schemas/wallets.ts'
import { ClientCurrency } from './currencies.ts'
import { ClientGroup } from './groups.ts'

export type ClientWallet = Pick<Wallet, 'id' | 'name'> & {
  currency: ClientCurrency
  group: ClientGroup
  balance: number
}

export type GetWalletsQuery = z.infer<typeof getWalletsQuerySchema>

export interface GetWalletsResponse {
  wallets: ClientWallet[]
}

export type GetWalletQuery = z.infer<typeof getWalletQuerySchema>

export interface GetWalletResponse {
  wallet: ClientWallet
}

export type CreateWalletBody = z.infer<typeof createWalletBodySchema>

export interface CreateWalletResponse {
  walletId: string
}

export type UpdateWalletBody = z.infer<typeof updateWalletBodySchema>

export interface UpdateWalletResponse {
  ok: true
}

export type DeleteWalletQuery = z.infer<typeof deleteWalletQuerySchema>

export interface DeleteWalletResponse {
  ok: true
}

export type SetWalletsOrderBody = z.infer<typeof setWalletsOrderBodySchema>

export interface SetWalletsOrderResponse {
  ok: true
}
