import { request } from '../../utils/client/request.ts'
import { PerformSyncBody, PerformSyncResponse } from '../server/sync/types.ts'

export const performSync = async (body: PerformSyncBody) => {
  const response = await request.post<PerformSyncBody, PerformSyncResponse>(
    '/api/sync',
    body,
  )

  response.updates.wallets.forEach((wallet) => {
    wallet.createdAt = new Date(wallet.createdAt)
  })

  response.updates.operations.forEach((operation) => {
    operation.date = new Date(operation.date)
  })

  return response
}
