import { request } from '../../utils/client/request'
import {
  GetCategoriesQuery,
  GetCategoriesResponse,
  RenameCategoryBody,
  RenameCategoryResponse,
} from '../types/categories'

const BASE_ROUTE = '/api/categories'

export const getCategories = async (query: GetCategoriesQuery) => {
  return await request.get<GetCategoriesResponse>(
    request.withQuery(`${BASE_ROUTE}/list`, query)
  )
}

export const renameCategory = async (data: RenameCategoryBody) => {
  return await request.post<RenameCategoryBody, RenameCategoryResponse>(
    `${BASE_ROUTE}/rename`,
    data
  )
}
