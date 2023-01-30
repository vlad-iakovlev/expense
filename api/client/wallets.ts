import { request } from '../../utils/request'
import {
  CreateWalletBody,
  CreateWalletResponse,
  GetWalletResponse,
  GetWalletsResponse,
  UpdateWalletBody,
  UpdateWalletResponse,
} from '../types/wallets'

const BASE_ROUTE = (groupId: string) => `/api/groups/${groupId}/wallets`

export const getWallets = async (groupId: string) => {
  return await request.get<GetWalletsResponse>(BASE_ROUTE(groupId))
}

export const getWallet = async (groupId: string, walletId: string) => {
  return await request.get<GetWalletResponse>(
    `${BASE_ROUTE(groupId)}/${walletId}`
  )
}

export const createWallet = async (groupId: string, data: CreateWalletBody) => {
  return await request.post<CreateWalletBody, CreateWalletResponse>(
    BASE_ROUTE(groupId),
    data
  )
}

export const updateWallet = async (
  groupId: string,
  walletId: string,
  data: UpdateWalletBody
) => {
  return await request.put<UpdateWalletBody, UpdateWalletResponse>(
    `${BASE_ROUTE(groupId)}/${walletId}`,
    data
  )
}
