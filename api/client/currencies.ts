import { request } from '../../utils/request'
import { GetCurrenciesResponse } from '../types/currencies'

export const getCurrencies = async () => {
  return await request.get<GetCurrenciesResponse>('/api/currencies')
}
