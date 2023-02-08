import { createContext, FC, ReactNode, useMemo } from 'react'
import { getGroup } from '../../api/client/groups'
import { GetGroupQuery, GetGroupResponse } from '../../api/types/groups'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetGroupResponse, GetGroupQuery>

interface ProviderProps {
  groupId: string
  children: ReactNode
}

export const GroupContext = createContext<ContextValue | undefined>(undefined)
GroupContext.displayName = 'GroupContext'

export const GroupProvider: FC<ProviderProps> = ({ groupId, children }) => {
  const value = useSwrValue(
    'group',
    getGroup,
    useMemo(() => ({ groupId }), [groupId])
  )

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}

export const useGroupContext = () => {
  const context = useSwrContext(GroupContext)

  return {
    group: context.data.group,
    groupQuery: context.query,
    mutateGroup: context.mutate,
  }
}
