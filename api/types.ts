import { z } from 'zod'
import {
  ClientCurrency,
  ClientGroup,
  ClientOperation,
  ClientWallet,
} from '../types/client.ts'
import { synchronizeBodySchema } from './server/schemas.ts'

export type SynchronizeBody = z.infer<typeof synchronizeBodySchema>

export interface SynchronizeResponse {
  currencies: ClientCurrency[]
  groups: ClientGroup[]
  wallets: ClientWallet[]
  operations: ClientOperation[]
}
