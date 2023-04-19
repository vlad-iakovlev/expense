import { FC, ReactNode, createContext, useMemo } from 'react'
import { getGroup } from '../../api/client/groups.ts'
import { GetGroupResponse } from '../../api/types/groups.ts'
import { useSwrContext } from '../../hooks/useSwrContext.ts'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue.ts'

type ContextValue = SwrValue<GetGroupResponse, undefined>

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
    useMemo(() => ({ groupId }), [groupId]),
    undefined
  )

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
}

export const useGroupContext = () => {
  const context = useSwrContext(GroupContext)

  return {
    groupResponse: context.response,
    mutateGroup: context.mutate,
  }
}
