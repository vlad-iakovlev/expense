import { FC, ReactNode, createContext } from 'react'
import { getGroups } from '../../api/client/groups.ts'
import { GetGroupsResponse } from '../../api/types/groups.ts'
import { useSwrContext } from '../../hooks/useSwrContext.ts'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue.ts'

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
