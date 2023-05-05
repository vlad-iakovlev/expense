import { z } from 'zod'
import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientUser,
  ClientUserGroup,
  ClientWallet,
} from '../types/client.ts'
import { Modify } from '../types/utility.ts'
import { performSyncBodySchema } from './server/schemas.ts'

export type PerformSyncBody = z.infer<typeof performSyncBodySchema>

export interface PerformSyncResponseUpdates {
  currencies: ClientCurrency[]
  users: ClientUser[]
  userGroups: ClientUserGroup[]
  groups: ClientGroup[]
  wallets: ClientWallet[]
  operations: Modify<ClientOperation, { date: string | Date }>[]
}

export type PerformSyncResponse =
  | {
      coldStartNeeded: true
      lastTransactionId?: never
      updates?: never
    }
  | {
      coldStartNeeded: false
      lastTransactionId: string
      updates: PerformSyncResponseUpdates
    }
