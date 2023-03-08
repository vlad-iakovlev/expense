import { request } from '../../utils/client/request'
import {
  GetStatisticsByCategoryQuery,
  GetStatisticsByCategoryResponse,
} from '../types/statistics'

const BASE_ROUTE = '/api/statistics'

export const getStatisticsByCategory = async (
  query: GetStatisticsByCategoryQuery
) => {
  return await request.get<GetStatisticsByCategoryResponse>(
    request.withQuery(`${BASE_ROUTE}/by-category`, query)
  )
}
