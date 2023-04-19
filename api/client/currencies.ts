import { request } from '../../utils/client/request.ts'
import { GetCurrenciesResponse } from '../types/currencies.ts'

const BASE_ROUTE = '/api/currencies'

export const getCurrencies = async () => {
  return await request.get<GetCurrenciesResponse>(`${BASE_ROUTE}/list`)
}
