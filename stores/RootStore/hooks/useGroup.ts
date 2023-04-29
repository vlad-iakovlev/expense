import { useCallback, useMemo } from 'react'
import { PopulatedClientGroup } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getPopulatedGroup } from '../getters/groups.ts'
import { GroupsActionTypes } from '../types.tsx'

interface Props {
  groupId: string
}

export const useGroup = ({ groupId }: Props) => {
  const { state, dispatch } = useRootStore()

  const group = useMemo<PopulatedClientGroup>(
    () => getPopulatedGroup(state, groupId),
    [groupId, state]
  )

  const setGroupName = useCallback(
    (name: string) => {
      dispatch({
        type: GroupsActionTypes.SET_GROUP_NAME,
        payload: { groupId, name },
      })
    },
    [dispatch, groupId]
  )

  const setGroupDefaultCurrency = useCallback(
    (defaultCurrencyId: string) => {
      dispatch({
        type: GroupsActionTypes.SET_GROUP_DEFAULT_CURRENCY,
        payload: { groupId, defaultCurrencyId },
      })
    },
    [dispatch, groupId]
  )

  const removeGroup = useCallback(() => {
    dispatch({
      type: GroupsActionTypes.REMOVE_GROUP,
      payload: { groupId },
    })
  }, [dispatch, groupId])

  return {
    group,
    setGroupName,
    setGroupDefaultCurrency,
    removeGroup,
  }
}
