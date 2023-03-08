import { request } from '../../utils/client/request'
import { GetCurrenciesResponse } from '../types/currencies'

const BASE_ROUTE = '/api/currencies'

export const getCurrencies = async () => {
  return await request.get<GetCurrenciesResponse>(`${BASE_ROUTE}/list`)
}
