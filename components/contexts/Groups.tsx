import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'
import { getGroups } from '../../api/client/groups'
import { ClientGroup } from '../../api/types/groups'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  groups: ClientGroup[]
  mutateGroups: () => Promise<unknown>
}

interface ProviderProps {
  children: ReactNode
}

export const GroupsContext = createContext<ContextValue | undefined>(undefined)

export const GroupsProvider: FC<ProviderProps> = ({ children }) => {
  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.GROUPS(),
    useCallback(() => getGroups(), [])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        groups: data.groups,
        mutateGroups: mutate,
      },
    [data, mutate]
  )

  return (
    <Fallback isLoading={isLoading} data={value} error={error}>
      <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
    </Fallback>
  )
}

export const useGroupsContext = () => {
  const context = useContext(GroupsContext)
  if (!context) {
    throw new Error('useGroupsContext must be within GroupsProvider')
  }
  return context
}
