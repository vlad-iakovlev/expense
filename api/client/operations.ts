import { request } from '../../utils/client/request.ts'
import {
  CreateOperationBody,
  CreateOperationResponse,
  DeleteOperationQuery,
  DeleteOperationResponse,
  GetOperationQuery,
  GetOperationResponse,
  GetOperationsQuery,
  GetOperationsResponse,
  UpdateOperationBody,
  UpdateOperationResponse,
} from '../types/operations.ts'

const BASE_ROUTE = '/api/operations'

export const getOperations = async (query: GetOperationsQuery) => {
  const response = await request.get<GetOperationsResponse>(
    request.withQuery(`${BASE_ROUTE}/list`, query)
  )

  response.operations.forEach((operation) => {
    operation.date = new Date(operation.date)
  })

  return response
}

export const getOperation = async (query: GetOperationQuery) => {
  const response = await request.get<GetOperationResponse>(
    request.withQuery(BASE_ROUTE, query)
  )

  response.operation.date = new Date(response.operation.date)

  return response
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

export const deleteOperation = async (query: DeleteOperationQuery) => {
  return await request.delete<DeleteOperationResponse>(
    request.withQuery(BASE_ROUTE, query)
  )
}
