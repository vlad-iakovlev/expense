import {
  PerformSyncBody,
  PerformSyncResponse,
} from '@/api/server/sync/types.js'
import { request } from '@/utils/client/request.js'

export const performSync = async (body: PerformSyncBody) =>
  await request.post<PerformSyncBody, PerformSyncResponse>('/api/sync', body)
