import { PerformSyncBody, PerformSyncResponse } from '@/api/server/sync/types'
import { request } from '@/utils/client/request'

export const performSync = async (body: PerformSyncBody) =>
  await request.post<PerformSyncBody, PerformSyncResponse>('/api/sync', body)
