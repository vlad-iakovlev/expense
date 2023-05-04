import { z } from 'zod'
import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientWallet,
} from '../types/client.ts'
import { Modify } from '../types/utility.ts'
import { performSyncBodySchema } from './server/schemas.ts'

export type PerformSyncBody = z.infer<typeof performSyncBodySchema>

export interface PerformSyncResponse {
  currencies: ClientCurrency[]
  groups: ClientGroup[]
  wallets: ClientWallet[]
  operations: Modify<ClientOperation, { date: string | Date }>[]
}
