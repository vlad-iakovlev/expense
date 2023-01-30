import { Group, Wallet } from '@prisma/client'
import { z } from 'zod'
import {
  createWalletBodySchema,
  updateWalletBodySchema,
} from '../server/schemas/wallet'
import { ClientCurrency } from './currencies'

export type ClientWallet = Pick<Wallet, 'id' | 'name'> & {
  group: Pick<Group, 'id' | 'name'>
  currency: ClientCurrency
  balance: number
}

export interface GetWalletsResponse {
  wallets: ClientWallet[]
}

export interface GetWalletResponse {
  wallet: ClientWallet
}

export type CreateWalletBody = z.infer<typeof createWalletBodySchema>

export interface CreateWalletResponse {
  wallet: ClientWallet
}

export type UpdateWalletBody = z.infer<typeof updateWalletBodySchema>

export interface UpdateWalletResponse {
  wallet: ClientWallet
}
