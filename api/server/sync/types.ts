import { z } from 'zod'
import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientUser,
  ClientUserGroup,
  ClientWallet,
} from '../../../types/client.ts'
import { Modify } from '../../../types/utility.ts'
import { performSyncBodySchema } from './schemas.ts'

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
