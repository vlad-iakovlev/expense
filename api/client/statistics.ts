import { request } from '../../utils/client/request.ts'
import {
  GetStatisticsByCategoryQuery,
  GetStatisticsByCategoryResponse,
} from '../types/statistics.ts'

const BASE_ROUTE = '/api/statistics'

export const getStatisticsByCategory = async (
  query: GetStatisticsByCategoryQuery
) => {
  return await request.get<GetStatisticsByCategoryResponse>(
    request.withQuery(`${BASE_ROUTE}/by-category`, query)
  )
}
