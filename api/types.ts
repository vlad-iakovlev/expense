import { z } from 'zod'
import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientWallet,
} from '../types/client.ts'
import { performSyncBodySchema } from './server/schemas.ts'

export type PerformSyncBody = z.infer<typeof performSyncBodySchema>

type PerformSyncResponseCurrency = ClientCurrency
type PerformSyncResponseGroup = Omit<ClientGroup, 'updatedAt'>
type PerformSyncResponseWallet = Omit<ClientWallet, 'updatedAt'>
type PerformSyncResponseOperation = Omit<
  ClientOperation,
  'date' | 'updatedAt'
> & { date: string | Date }

export interface PerformSyncResponse {
  currencies: PerformSyncResponseCurrency[]
  groups: PerformSyncResponseGroup[]
  wallets: PerformSyncResponseWallet[]
  operations: PerformSyncResponseOperation[]
}
