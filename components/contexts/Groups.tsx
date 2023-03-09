import { createContext, FC, ReactNode } from 'react'
import { getGroups } from '../../api/client/groups'
import { GetGroupsResponse } from '../../api/types/groups'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetGroupsResponse, undefined>

interface ProviderProps {
  children: ReactNode
}

export const GroupsContext = createContext<ContextValue | undefined>(undefined)
GroupsContext.displayName = 'GroupsContext'

export const GroupsProvider: FC<ProviderProps> = ({ children }) => {
  const value = useSwrValue('groups', getGroups, undefined, undefined)

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  )
}

export const useGroupsContext = () => {
  const context = useSwrContext(GroupsContext)

  return {
    groupsResponse: context.response,
    mutateGroups: context.mutate,
  }
}
