import { Operation } from '@prisma/client'
import { z } from 'zod'
import {
  createOperationBodySchema,
  deleteOperationQuerySchema,
  getOperationQuerySchema,
  getOperationsQuerySchema,
  updateOperationBodySchema,
} from '../server/schemas/operations.ts'
import { ClientWallet } from './wallets.ts'

export type ClientOperation = Pick<
  Operation,
  'id' | 'name' | 'category' | 'date' | 'incomeAmount' | 'expenseAmount'
> & {
  incomeWallet: Omit<ClientWallet, 'balance'> | null
  expenseWallet: Omit<ClientWallet, 'balance'> | null
}

export type GetOperationsQuery = z.infer<typeof getOperationsQuerySchema>

export interface GetOperationsResponse {
  operations: ClientOperation[]
}

export type GetOperationQuery = z.infer<typeof getOperationQuerySchema>

export interface GetOperationResponse {
  operation: ClientOperation
}

export type CreateOperationBody = z.infer<typeof createOperationBodySchema>

export interface CreateOperationResponse {
  operation: ClientOperation
}

export type UpdateOperationBody = z.infer<typeof updateOperationBodySchema>

export interface UpdateOperationResponse {
  operation: ClientOperation
}

export type DeleteOperationQuery = z.infer<typeof deleteOperationQuerySchema>

export interface DeleteOperationResponse {
  ok: true
}
