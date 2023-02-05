import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'
import { getGroup } from '../../api/client/groups'
import { ClientGroup, GetGroupQuery } from '../../api/types/groups'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  groupQuery: GetGroupQuery
  group: ClientGroup
  mutateGroup: () => Promise<unknown>
}

interface ProviderProps {
  groupId: string
  children: ReactNode
}

export const GroupContext = createContext<ContextValue | undefined>(undefined)

export const GroupProvider: FC<ProviderProps> = ({ groupId, children }) => {
  const query = useMemo<GetGroupQuery>(() => ({ groupId }), [groupId])

  const { data, error, isLoading, mutate } = useSWR(
    SWR_KEYS.GROUP(query),
    useCallback(() => getGroup(query), [query])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        groupQuery: query,
        group: data.group,
        mutateGroup: mutate,
      },
    [data, mutate, query]
  )

  return (
    <Fallback isLoading={isLoading} data={value} error={error}>
      <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
    </Fallback>
  )
}

export const useGroupContext = () => {
  const context = useContext(GroupContext)
  if (!context) {
    throw new Error('useGroupContext must be within GroupProvider')
  }
  return context
}
