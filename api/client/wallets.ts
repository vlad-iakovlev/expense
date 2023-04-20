import { request } from '../../utils/client/request.ts'
import {
  CreateWalletBody,
  CreateWalletResponse,
  DeleteWalletQuery,
  DeleteWalletResponse,
  GetWalletQuery,
  GetWalletResponse,
  GetWalletsQuery,
  GetWalletsResponse,
  UpdateWalletBody,
  UpdateWalletResponse,
} from '../types/wallets.ts'

const BASE_ROUTE = '/api/wallets'

export const getWallets = async (query: GetWalletsQuery) => {
  return await request.get<GetWalletsResponse>(
    request.withQuery(`${BASE_ROUTE}/list`, query)
  )
}

export const getWallet = async (query: GetWalletQuery) => {
  return await request.get<GetWalletResponse>(
    request.withQuery(BASE_ROUTE, query)
  )
}

export const createWallet = async (data: CreateWalletBody) => {
  return await request.post<CreateWalletBody, CreateWalletResponse>(
    BASE_ROUTE,
    data
  )
}

export const updateWallet = async (data: UpdateWalletBody) => {
  return await request.put<UpdateWalletBody, UpdateWalletResponse>(
    BASE_ROUTE,
    data
  )
}

export const deleteWallet = async (query: DeleteWalletQuery) => {
  return await request.delete<DeleteWalletResponse>(
    request.withQuery(BASE_ROUTE, query)
  )
}
