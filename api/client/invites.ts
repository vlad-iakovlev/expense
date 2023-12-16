import { request } from '../../utils/client/request.js'
import {
  AcceptInviteBody,
  AcceptInviteResponse,
  CreateInviteBody,
  CreateInviteResponse,
} from '../server/invites/types.js'

export const createInvite = async (body: CreateInviteBody) => {
  const response = await request.put<CreateInviteBody, CreateInviteResponse>(
    '/api/invites/create',
    body,
  )

  response.expiresAt = new Date(response.expiresAt)

  return response
}

export const acceptInvite = async (body: AcceptInviteBody) => {
  await request.put<AcceptInviteBody, AcceptInviteResponse>(
    '/api/invites/accept',
    body,
  )
}
