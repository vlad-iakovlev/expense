import { Reducer, ReducerAction } from 'react'
import { ClientUser } from '../../../types/client.ts'
import { getDefaultCurrency } from '../getters/currencies.ts'
import { GroupsActionTypes, RootStoreState } from '../types.tsx'

const createGroupReducer: Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.CREATE_GROUP
    payload: {
      groupId: string
      user: ClientUser
    }
  }
> = (state, action) => {
  return {
    ...state,
    groups: [
      ...state.groups,
      {
        id: action.payload.groupId,
        updatedAt: new Date(),
        name: 'Untitled',
        removed: false,
        defaultCurrencyId: getDefaultCurrency(state).id,
        users: [action.payload.user],
      },
    ],
  }
}

const removeGroupReducer: Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.REMOVE_GROUP
    payload: {
      groupId: string
    }
  }
> = (state, action) => {
  return {
    ...state,
    groups: state.groups.map((group) => {
      if (group.id === action.payload.groupId) {
        return {
          ...group,
          updatedAt: new Date(),
          removed: true,
        }
      }

      return group
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    groups: state.groups.map((group) => {
      if (group.id === action.payload.groupId) {
        return {
          ...group,
          updatedAt: new Date(),
          name: action.payload.name,
        }
      }

      return group
    }),
  }
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
> = (state, action) => {
  return {
    ...state,
    groups: state.groups.map((group) => {
      if (group.id === action.payload.groupId) {
        return {
          ...group,
          updatedAt: new Date(),
          defaultCurrencyId: action.payload.defaultCurrencyId,
        }
      }

      return group
    }),
  }
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
