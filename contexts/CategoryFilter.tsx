import assert from 'assert'
import React from 'react'

interface ContextValue {
  categoryFilter: string
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>
  toggleCategoryFilter: (category: string) => void
  resetCategoryFilter: () => void
}

export const CategoryFilterContext = React.createContext<
  ContextValue | undefined
>(undefined)
CategoryFilterContext.displayName = 'CategoryFilterContext'

interface ProviderProps {
  children: React.ReactNode
}

export const CategoryFilterProvider = ({ children }: ProviderProps) => {
  const [categoryFilter, setCategoryFilter] = React.useState('')

  const toggleCategoryFilter = React.useCallback(
    (category: string) =>
      setCategoryFilter((currentCategory) =>
        currentCategory === category ? '' : category,
      ),
    [],
  )

  const resetCategoryFilter = React.useCallback(() => setCategoryFilter(''), [])

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
  const context = React.useContext(CategoryFilterContext)
  assert(
    context,
    'useCategoryFilter must be used within a CategoryFilterProvider',
  )
  return context
}
