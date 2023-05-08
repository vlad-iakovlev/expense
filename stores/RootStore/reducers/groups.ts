import { produce } from 'immer'
import { Reducer, ReducerAction } from 'react'
import { getDefaultCurrency } from '../getters/currencies.ts'
import { GroupsActionTypes, RootStoreState } from '../types.tsx'

const createGroupReducer: Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.CREATE_GROUP
    payload: {
      groupId: string
    }
  }
> = (state, { payload: { groupId } }) => {
  return produce(state, (draft) => {
    draft.groups.push({
      id: groupId,
      removed: false,
      clientOnly: true,
      name: 'Untitled',
      defaultCurrencyId: getDefaultCurrency(state).id,
    })
    draft.nextSyncTransaction.groups.push(groupId)
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
  return produce(state, (draft) => {
    draft.groups.forEach((groups) => {
      if (groups.id === groupId) {
        groups.removed = true
        draft.nextSyncTransaction.groups.push(groupId)
      }
    })
  })
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
  return produce(state, (draft) => {
    draft.groups.forEach((group) => {
      if (group.id === groupId) {
        group.name = name
        draft.nextSyncTransaction.groups.push(groupId)
      }
    })
  })
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
  return produce(state, (draft) => {
    draft.groups.forEach((group) => {
      if (group.id === groupId) {
        group.defaultCurrencyId = defaultCurrencyId
        draft.nextSyncTransaction.groups.push(groupId)
      }
    })
  })
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
