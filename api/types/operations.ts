import { Group, Operation, Wallet } from '@prisma/client'
import { z } from 'zod'
import {
  createOperationBodySchema,
  deleteOperationQuerySchema,
  getOperationQuerySchema,
  getOperationsQuerySchema,
  updateOperationBodySchema,
} from '../server/schemas/operations'
import { ClientCurrency } from './currencies'

export type ClientOperation = Pick<
  Operation,
  'id' | 'name' | 'date' | 'amount' | 'category'
> & {
  wallet: Pick<Wallet, 'id' | 'name'> & {
    currency: ClientCurrency
    group: Pick<Group, 'id' | 'name'>
  }
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
