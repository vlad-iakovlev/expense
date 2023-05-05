import { Reducer, ReducerAction } from 'react'
import { getDefaultCurrency } from '../getters/currencies.ts'
import { GroupsActionTypes, RootStoreState } from '../types.tsx'
import { createInState, updateInState } from '../utils.ts'

const createGroupReducer: Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.CREATE_GROUP
    payload: {
      groupId: string
      userGroupId: string
      userId: string
    }
  }
> = (state, { payload: { groupId, userGroupId, userId } }) => {
  state = createInState(state, 'userGroups', {
    id: userGroupId,
    userId,
    groupId,
  })

  return createInState(state, 'groups', {
    id: groupId,
    name: 'Untitled',
    defaultCurrencyId: getDefaultCurrency(state).id,
  })
}

const removeGroupReducer: Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.REMOVE_GROUP
    payload: {
      groupId: string
    }
  }
> = (state, { payload: { groupId } }) => {
  return updateInState(state, 'groups', groupId, { removed: true })
}

const setGroupNameReducer: Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.SET_GROUP_NAME
    payload: {
      groupId: string
      name: string
    }
  }
> = (state, { payload: { groupId, name } }) => {
  return updateInState(state, 'groups', groupId, { name })
}

const setGroupDefaultCurrencyReducer: Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.SET_GROUP_DEFAULT_CURRENCY
    payload: {
      groupId: string
      defaultCurrencyId: string
    }
  }
> = (state, { payload: { groupId, defaultCurrencyId } }) => {
  return updateInState(state, 'groups', groupId, { defaultCurrencyId })
}

export type GroupsAction =
  | ReducerAction<typeof createGroupReducer>
  | ReducerAction<typeof removeGroupReducer>
  | ReducerAction<typeof setGroupNameReducer>
  | ReducerAction<typeof setGroupDefaultCurrencyReducer>

export const isGroupsAction = (action: {
  type: string
  payload?: unknown
}): action is GroupsAction => {
  return Object.values(GroupsActionTypes).includes(
    action.type as GroupsActionTypes
  )
}

export const groupsReducer: Reducer<RootStoreState, GroupsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case GroupsActionTypes.CREATE_GROUP:
      return createGroupReducer(state, action)

    case GroupsActionTypes.REMOVE_GROUP:
      return removeGroupReducer(state, action)

    case GroupsActionTypes.SET_GROUP_NAME:
      return setGroupNameReducer(state, action)

    case GroupsActionTypes.SET_GROUP_DEFAULT_CURRENCY:
      return setGroupDefaultCurrencyReducer(state, action)
  }
}
