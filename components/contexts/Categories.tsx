import { createContext, FC, ReactNode, useMemo } from 'react'
import { getCategories } from '../../api/client/categories'
import { GetCategoriesResponse } from '../../api/types/categories'
import { useSwrContext } from '../../hooks/useSwrContext'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue'

type ContextValue = SwrValue<GetCategoriesResponse, undefined>

interface ProviderProps {
  groupId?: string
  walletId?: string
  children: ReactNode
}

export const CategoriesContext = createContext<ContextValue | undefined>(
  undefined
)
CategoriesContext.displayName = 'CategoriesContext'

export const CategoriesProvider: FC<ProviderProps> = ({
  groupId,
  walletId,
  children,
}) => {
  const value = useSwrValue(
    'categories',
    getCategories,
    useMemo(() => ({ groupId, walletId }), [groupId, walletId]),
    undefined
  )

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategoriesContext = () => {
  const context = useSwrContext(CategoriesContext)

  return {
    categoriesResponse: context.response,
    mutateCategories: context.mutate,
  }
}
