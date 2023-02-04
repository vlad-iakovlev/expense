import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'
import { getCategories } from '../../api/client/categories'
import { GetCategoriesQuery } from '../../api/types/categories'
import { SWR_KEYS } from '../../constants/swr'
import { Fallback } from '../ui-kit/Fallback'

interface ContextValue {
  categoriesQuery: GetCategoriesQuery
  categories: string[]
  mutateCategories: () => Promise<unknown>
}

interface ProviderProps {
  groupId?: string
  children: ReactNode
}

export const CategoriesContext = createContext<ContextValue | undefined>(
  undefined
)

export const CategoriesProvider: FC<ProviderProps> = ({
  groupId,
  children,
}) => {
  const query = useMemo<GetCategoriesQuery>(
    () => ({
      groupId,
    }),
    [groupId]
  )

  const { data, isLoading, mutate } = useSWR(
    SWR_KEYS.CATEGORIES(query),
    useCallback(() => getCategories(query), [query])
  )

  const value = useMemo<ContextValue | undefined>(
    () =>
      data && {
        categoriesQuery: query,
        categories: data.categories,
        mutateCategories: mutate,
      },
    [data, mutate, query]
  )

  return (
    <Fallback isLoading={isLoading} data={value}>
      <CategoriesContext.Provider value={value}>
        {children}
      </CategoriesContext.Provider>
    </Fallback>
  )
}

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext)
  if (!context) {
    throw new Error('useCategoriesContext must be within CategoriesProvider')
  }
  return context
}
