import { request } from '../../utils/request'
import {
  CreateWalletBody,
  CreateWalletResponse,
  GetWalletResponse,
  GetWalletsResponse,
  UpdateWalletBody,
  UpdateWalletResponse,
} from '../types/wallets'

export const getWallets = async (groupId: string) => {
  return await request.get<GetWalletsResponse>(`/api/groups/${groupId}/wallets`)
}

export const getWallet = async (groupId: string, walletId: string) => {
  return await request.get<GetWalletResponse>(
    `/api/groups/${groupId}/wallets/${walletId}`
  )
}

export const createWallet = async (groupId: string, data: CreateWalletBody) => {
  return await request.post<CreateWalletBody, CreateWalletResponse>(
    `/api/groups/${groupId}/wallets`,
    data
  )
}

export const updateWallet = async (
  groupId: string,
  walletId: string,
  data: UpdateWalletBody
) => {
  return await request.put<UpdateWalletBody, UpdateWalletResponse>(
    `/api/groups/${groupId}/wallets/${walletId}`,
    data
  )
}
