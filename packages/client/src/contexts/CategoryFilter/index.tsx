import { createContext, use, useCallback, useState } from 'react'

type ContextValue = {
  categoryFilter: string
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>
  toggleCategoryFilter: (category: string) => void
  resetCategoryFilter: () => void
}

export const CategoryFilterContext = createContext<ContextValue | undefined>(
  undefined,
)
CategoryFilterContext.displayName = 'CategoryFilterContext'

type ProviderProps = {
  children: React.ReactNode
}

export const CategoryFilterProvider = ({ children }: ProviderProps) => {
  const [categoryFilter, setCategoryFilter] = useState('')

  const toggleCategoryFilter = useCallback((category: string) => {
    setCategoryFilter((currentCategory) =>
      currentCategory === category ? '' : category,
    )
  }, [])

  const resetCategoryFilter = useCallback(() => {
    setCategoryFilter('')
  }, [])

  return (
    <CategoryFilterContext
      value={{
        categoryFilter,
        setCategoryFilter,
        toggleCategoryFilter,
        resetCategoryFilter,
      }}
    >
      {children}
    </CategoryFilterContext>
  )
}

export const useCategoryFilter = () => {
  const context = use(CategoryFilterContext)
  if (!context) {
    throw new Error(
      'useCategoryFilter must be used within a CategoryFilterProvider',
    )
  }
  return context
}
