import { z } from 'zod'
import { getStatisticsByCategoryQuerySchema } from '../server/schemas/statistics.ts'
import { ClientCurrency } from './currencies.ts'

export type GetStatisticsByCategoryQuery = z.infer<
  typeof getStatisticsByCategoryQuerySchema
>

export interface StatisticsByCategoryItem {
  category: string
  incomeAmount: number
  expenseAmount: number
}

export interface GetStatisticsByCategoryResponse {
  statisticsByCategory: {
    currency: ClientCurrency
    items: StatisticsByCategoryItem[]
  }
}
