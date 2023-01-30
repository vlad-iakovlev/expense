import { request } from '../../utils/request'
import { GetCurrenciesResponse } from '../types/currencies'

const BASE_ROUTE = '/api/currencies'

export const getCurrencies = async () => {
  return await request.get<GetCurrenciesResponse>(BASE_ROUTE)
}
