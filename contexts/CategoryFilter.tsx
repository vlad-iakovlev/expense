import assert from 'assert'
import { createContext, useCallback, useContext, useState } from 'react'

interface ContextValue {
  categoryFilter: string
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>
  toggleCategoryFilter: (category: string) => void
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

  const toggleCategoryFilter = useCallback(
    (category: string) =>
      setCategoryFilter((currentCategory) =>
        currentCategory === category ? '' : category,
      ),
    [],
  )

  const resetCategoryFilter = useCallback(() => setCategoryFilter(''), [])

  return (
    <CategoryFilterContext.Provider
      value={{
        categoryFilter,
        setCategoryFilter,
        toggleCategoryFilter,
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
