import { request } from '../../utils/client/request.ts'
import { SynchronizeBody, SynchronizeResponse } from '../types.ts'

export const synchronize = async (body: SynchronizeBody) => {
  const response = await request.post<SynchronizeBody, SynchronizeResponse>(
    '/api/synchronize',
    body
  )

  response.groups.forEach((group) => {
    group.createdAt = new Date(group.createdAt)
    group.updatedAt = new Date(group.updatedAt)
  })

  response.wallets.forEach((wallet) => {
    wallet.createdAt = new Date(wallet.createdAt)
    wallet.updatedAt = new Date(wallet.updatedAt)
  })

  response.operations.forEach((operation) => {
    operation.date = new Date(operation.date)
    operation.createdAt = new Date(operation.createdAt)
    operation.updatedAt = new Date(operation.updatedAt)
  })

  return response
}
