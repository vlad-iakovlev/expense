import { request } from '../../utils/request'
import {
  CreateWalletBody,
  CreateWalletResponse,
  GetWalletQuery,
  GetWalletResponse,
  GetWalletsQuery,
  GetWalletsResponse,
  UpdateWalletBody,
  UpdateWalletResponse,
} from '../types/wallets'

const BASE_ROUTE = '/api/wallets'

export const getWallets = async (groupId?: string) => {
  return await request.get<GetWalletsResponse>(
    request.buildUrl<GetWalletsQuery>(`${BASE_ROUTE}/list`, { groupId })
  )
}

export const getWallet = async (walletId: string) => {
  return await request.get<GetWalletResponse>(
    request.buildUrl<GetWalletQuery>(BASE_ROUTE, { walletId })
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
