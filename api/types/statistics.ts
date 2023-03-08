import { z } from 'zod'
import { getStatisticsByCategoryQuerySchema } from '../server/schemas/statistics'
import { ClientCurrency } from './currencies'

export type GetStatisticsByCategoryQuery = z.infer<
  typeof getStatisticsByCategoryQuerySchema
>

export interface GetStatisticsByCategoryResponse {
  statisticsByCategory: {
    currency: ClientCurrency
    items: {
      category: string
      incomeAmount: number
      expenseAmount: number
    }[]
  }
}
