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
}

interface ProviderProps {
  children: ReactNode
}

const GroupsContext = createContext<ContextValue | undefined>(undefined)

export const GroupsProvider: FC<ProviderProps> = ({ children }) => {
  const { data, isLoading } = useSWR(
    SWR_KEYS.GROUPS(),
    useCallback(() => getGroups(), [])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        groups: data.groups,
      },
    [data]
  )

  return (
    <Fallback isLoading={isLoading} data={value}>
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
