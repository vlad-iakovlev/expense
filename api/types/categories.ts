import { z } from 'zod'
import { getCategoriesQuerySchema } from '../server/schemas/categories'

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>

export interface GetCategoriesResponse {
  categories: string[]
}
