import assert from 'assert'
import { createContext, useCallback, useContext, useState } from 'react'

interface ContextValue {
  categoryFilter: string
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>
  resetCategoryFilter: () => void
}

export const CategoryFilterContext = createContext<ContextValue | undefined>(
  undefined,
)
CategoryFilterContext.displayName = 'CategoryFilterContext'

interface ProviderProps {
  children: React.ReactNode
}

export const CategoryFilterProvider = ({ children }: ProviderProps) => {
  const [categoryFilter, setCategoryFilter] = useState('')

  const resetCategoryFilter = useCallback(() => setCategoryFilter(''), [])

  return (
    <CategoryFilterContext.Provider
      value={{
        categoryFilter,
        setCategoryFilter,
        resetCategoryFilter,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  )
}

export const useCategoryFilter = () => {
  const context = useContext(CategoryFilterContext)
  assert(
    context,
    'useCategoryFilter must be used within a CategoryFilterProvider',
  )
  return context
}
