import { request } from '../../utils/request'
import {
  CreateGroupBody,
  CreateGroupResponse,
  GetGroupQuery,
  GetGroupResponse,
  GetGroupsResponse,
  UpdateGroupBody,
  UpdateGroupResponse,
} from '../types/groups'

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
