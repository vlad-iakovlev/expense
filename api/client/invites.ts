import { request } from '../../utils/client/request.js'
import {
  AcceptInviteBody,
  AcceptInviteResponse,
  CreateInviteBody,
  CreateInviteResponse,
} from '../server/invites/types.js'

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
