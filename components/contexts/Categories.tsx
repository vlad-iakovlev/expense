import { FC, ReactNode, createContext, useMemo } from 'react'
import { getCategories } from '../../api/client/categories.ts'
import { GetCategoriesResponse } from '../../api/types/categories.ts'
import { useSwrContext } from '../../hooks/useSwrContext.ts'
import { SwrValue, useSwrValue } from '../../hooks/useSwrValue.ts'

interface CategoriesPayload {
  groupId?: string
  walletId?: string
}

type ContextValue = SwrValue<GetCategoriesResponse, CategoriesPayload>

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
    useMemo(() => ({ groupId, walletId }), [groupId, walletId])
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
    categoriesPayload: context.payload,
    mutateCategories: context.mutate,
  }
}
