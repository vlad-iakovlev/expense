import { z } from 'zod'
import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientUser,
  ClientUserGroup,
  ClientWallet,
} from '../../../types/client.js'
import { Modify } from '../../../types/utility.js'
import { performSyncBodySchema } from './schemas.js'

export type PerformSyncBody = z.infer<typeof performSyncBodySchema>

export interface PerformSyncResponseUpdates {
  currencies: ClientCurrency[]
  users: ClientUser[]
  userGroups: ClientUserGroup[]
  groups: ClientGroup[]
  wallets: ClientWallet[]
  operations: Modify<
    ClientOperation,
    { incomeAmount: string; expenseAmount: string }
  >[]
}

export interface PerformSyncResponse {
  lastTransactionId: string
  updates: PerformSyncResponseUpdates
}
