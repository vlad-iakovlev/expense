import { request } from '../../utils/request'
import {
  CreateOperationBody,
  CreateOperationResponse,
  GetOperationQuery,
  GetOperationResponse,
  GetOperationsQuery,
  GetOperationsResponse,
  UpdateOperationBody,
  UpdateOperationResponse,
} from '../types/operations'

const BASE_ROUTE = '/api/operations'

export const getOperations = async (walletId?: string) => {
  return await request.get<GetOperationsResponse>(
    request.buildUrl<GetOperationsQuery>(`${BASE_ROUTE}/list`, { walletId })
  )
}

export const getOperation = async (operationId: string) => {
  return await request.get<GetOperationResponse>(
    request.buildUrl<GetOperationQuery>(BASE_ROUTE, { operationId })
  )
}

export const createOperation = async (data: CreateOperationBody) => {
  return await request.post<CreateOperationBody, CreateOperationResponse>(
    BASE_ROUTE,
    data
  )
}

export const updateOperation = async (data: UpdateOperationBody) => {
  return await request.put<UpdateOperationBody, UpdateOperationResponse>(
    BASE_ROUTE,
    data
  )
}
