import { z } from 'zod'
import { getStatisticsByCategoryQuerySchema } from '../server/schemas/statistics'
import { ClientCurrency } from './currencies'

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
