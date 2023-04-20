import { request } from '../../utils/client/request.ts'
import {
  CreateGroupBody,
  CreateGroupResponse,
  DeleteGroupQuery,
  DeleteGroupResponse,
  GetGroupQuery,
  GetGroupResponse,
  GetGroupsResponse,
  UpdateGroupBody,
  UpdateGroupResponse,
} from '../types/groups.ts'

const BASE_ROUTE = '/api/groups'

export const getGroups = async () => {
  return await request.get<GetGroupsResponse>(`${BASE_ROUTE}/list`)
}

export const getGroup = async (query: GetGroupQuery) => {
  return await request.get<GetGroupResponse>(
    request.withQuery(BASE_ROUTE, query)
  )
}

export const createGroup = async (data: CreateGroupBody) => {
  return await request.post<CreateGroupBody, CreateGroupResponse>(
    BASE_ROUTE,
    data
  )
}

export const updateGroup = async (data: UpdateGroupBody) => {
  return await request.put<UpdateGroupBody, UpdateGroupResponse>(
    BASE_ROUTE,
    data
  )
}

export const deleteGroup = async (query: DeleteGroupQuery) => {
  return await request.delete<DeleteGroupResponse>(
    request.withQuery(BASE_ROUTE, query)
  )
}
