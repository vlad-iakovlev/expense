import { z } from 'zod'
import { performSyncBodySchema, performSyncResponseSchema } from './schemas.js'

export type PerformSyncBody = z.infer<typeof performSyncBodySchema>

export type PerformSyncResponse = z.infer<typeof performSyncResponseSchema>
