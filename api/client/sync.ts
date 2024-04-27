import { request } from '../../utils/client/request.js'
import { PerformSyncBody, PerformSyncResponse } from '../server/sync/types.js'

export const performSync = async (body: PerformSyncBody) => {
  return await request.post<PerformSyncBody, PerformSyncResponse>(
    '/api/sync',
    body,
  )
}
