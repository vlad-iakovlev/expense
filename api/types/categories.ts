import { z } from 'zod'
import {
  getCategoriesQuerySchema,
  renameCategoryBodySchema,
} from '../server/schemas/categories.ts'

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>

export interface GetCategoriesResponse {
  categories: string[]
}

export type RenameCategoryBody = z.infer<typeof renameCategoryBodySchema>

export type RenameCategoryResponse = Record<never, unknown>
