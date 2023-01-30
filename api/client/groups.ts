import { request } from '../../utils/request'
import {
  CreateGroupBody,
  CreateGroupResponse,
  GetGroupResponse,
  GetGroupsResponse,
  UpdateGroupBody,
  UpdateGroupResponse,
} from '../types/groups'

export const getGroups = async () => {
  return await request.get<GetGroupsResponse>('/api/groups')
}

export const getGroup = async (groupId: string) => {
  return await request.get<GetGroupResponse>(`/api/groups/${groupId}`)
}

export const createGroup = async (data: CreateGroupBody) => {
  return await request.post<CreateGroupBody, CreateGroupResponse>(
    '/api/groups',
    data
  )
}

export const updateGroup = async (groupId: string, data: UpdateGroupBody) => {
  return await request.put<UpdateGroupBody, UpdateGroupResponse>(
    `/api/groups/${groupId}`,
    data
  )
}
