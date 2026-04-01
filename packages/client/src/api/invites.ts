import {
  AcceptInviteBody,
  AcceptInviteResponse,
  CreateInviteBody,
  CreateInviteResponse,
} from '@expense/schemas/invites/types'
import { request } from '@/utils/request'

export const createInvite = async (body: CreateInviteBody) =>
  await request.post<CreateInviteBody, CreateInviteResponse>(
    '/api/invites/create',
    body,
  )

export const acceptInvite = async (body: AcceptInviteBody) =>
  await request.post<AcceptInviteBody, AcceptInviteResponse>(
    '/api/invites/accept',
    body,
  )
