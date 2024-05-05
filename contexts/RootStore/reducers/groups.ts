import { produce } from 'immer'
import { ClientUser } from '@/types/client.js'
import { getDefaultCurrencyId } from '../getters/currencies.js'
import { GroupsActionTypes, RootStoreState } from '../types.jsx'

const createGroupReducer: React.Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.CREATE_GROUP
    payload: {
      groupId: string
    }
  }
> = (state, { payload: { groupId } }) =>
  produce(state, (draft) => {
    draft.groups.push({
      id: groupId,
      removed: false,
      clientOnly: true,
      clientRemoved: false,
      name: 'Untitled',
      defaultCurrencyId: getDefaultCurrencyId(state),
    })
    draft.nextSyncTransaction.groups.push(groupId)
  })

const removeGroupReducer: React.Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.REMOVE_GROUP
    payload: {
      groupId: string
    }
  }
> = (state, { payload: { groupId } }) =>
  produce(state, (draft) => {
    draft.groups.forEach((groups) => {
      if (groups.id === groupId) {
        groups.removed = true
        draft.nextSyncTransaction.groups.push(groupId)
      }
    })
  })

const removeMemberFromGroupReducer: React.Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.REMOVE_MEMBER_FROM_GROUP
    payload: {
      groupId: string
      userId: string
    }
  }
> = (state, { payload: { groupId, userId } }) =>
  produce(state, (draft) => {
    draft.userGroups.forEach((userGroup) => {
      if (userGroup.groupId === groupId && userGroup.userId === userId) {
        userGroup.removed = true
        draft.nextSyncTransaction.userGroups.push(userGroup.id)
      }
    })
  })

const leaveGroupReducer: React.Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.LEAVE_GROUP
    payload: {
      groupId: string
      me: ClientUser
    }
  }
> = (state, { payload: { groupId, me } }) =>
  produce(state, (draft) => {
    draft.userGroups.forEach((userGroup) => {
      if (userGroup.groupId === groupId && userGroup.userId === me.id) {
        userGroup.removed = true
        draft.nextSyncTransaction.userGroups.push(userGroup.id)
      }
    })

    draft.groups.map((group) => {
      if (group.id === groupId) {
        group.clientRemoved = true
      }
    })
  })

const setGroupNameReducer: React.Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.SET_GROUP_NAME
    payload: {
      groupId: string
      name: string
    }
  }
> = (state, { payload: { groupId, name } }) =>
  produce(state, (draft) => {
    draft.groups.forEach((group) => {
      if (group.id === groupId) {
        group.name = name
        draft.nextSyncTransaction.groups.push(groupId)
      }
    })
  })

const setGroupDefaultCurrencyReducer: React.Reducer<
  RootStoreState,
  {
    type: GroupsActionTypes.SET_GROUP_DEFAULT_CURRENCY
    payload: {
      groupId: string
      defaultCurrencyId: string
    }
  }
> = (state, { payload: { groupId, defaultCurrencyId } }) =>
  produce(state, (draft) => {
    draft.groups.forEach((group) => {
      if (group.id === groupId) {
        group.defaultCurrencyId = defaultCurrencyId
        draft.nextSyncTransaction.groups.push(groupId)
      }
    })
  })

export type GroupsAction =
  | React.ReducerAction<typeof createGroupReducer>
  | React.ReducerAction<typeof removeGroupReducer>
  | React.ReducerAction<typeof removeMemberFromGroupReducer>
  | React.ReducerAction<typeof leaveGroupReducer>
  | React.ReducerAction<typeof setGroupNameReducer>
  | React.ReducerAction<typeof setGroupDefaultCurrencyReducer>

export const isGroupsAction = (action: {
  type: string
  payload?: unknown
}): action is GroupsAction =>
  Object.values(GroupsActionTypes).includes(action.type as GroupsActionTypes)

export const groupsReducer: React.Reducer<RootStoreState, GroupsAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case GroupsActionTypes.CREATE_GROUP:
      return createGroupReducer(state, action)

    case GroupsActionTypes.REMOVE_GROUP:
      return removeGroupReducer(state, action)

    case GroupsActionTypes.REMOVE_MEMBER_FROM_GROUP:
      return removeMemberFromGroupReducer(state, action)

    case GroupsActionTypes.LEAVE_GROUP:
      return leaveGroupReducer(state, action)

    case GroupsActionTypes.SET_GROUP_NAME:
      return setGroupNameReducer(state, action)

    case GroupsActionTypes.SET_GROUP_DEFAULT_CURRENCY:
      return setGroupDefaultCurrencyReducer(state, action)
  }
}
