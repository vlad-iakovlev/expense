import { Group } from '@prisma/client'
import { z } from 'zod'
import {
  createGroupBodySchema,
  deleteGroupQuerySchema,
  getGroupQuerySchema,
  updateGroupBodySchema,
} from '../server/schemas/groups'
import { ClientCurrency } from './currencies'
import { ClientUser } from './users'

export type ClientGroup = Pick<Group, 'id' | 'name'> & {
  defaultCurrency: ClientCurrency
  users: ClientUser[]
}

export interface GetGroupsResponse {
  groups: ClientGroup[]
}

export type GetGroupQuery = z.infer<typeof getGroupQuerySchema>

export interface GetGroupResponse {
  group: ClientGroup
}

export type CreateGroupBody = z.infer<typeof createGroupBodySchema>

export interface CreateGroupResponse {
  group: ClientGroup
}

export type UpdateGroupBody = z.infer<typeof updateGroupBodySchema>

export interface UpdateGroupResponse {
  group: ClientGroup
}

export type DeleteGroupQuery = z.infer<typeof deleteGroupQuerySchema>

export interface DeleteGroupResponse {
  ok: true
}
