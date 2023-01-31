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

export const getOperations = async (query: GetOperationsQuery = {}) => {
  return await request.get<GetOperationsResponse>(
    request.withQuery<GetOperationsQuery>(`${BASE_ROUTE}/list`, query)
  )
}

export const getOperation = async (query: GetOperationQuery) => {
  return await request.get<GetOperationResponse>(
    request.withQuery<GetOperationQuery>(BASE_ROUTE, query)
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
