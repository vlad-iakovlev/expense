import assert from 'assert'
import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

interface ContextValue {
  categoryFilter: string
  setCategoryFilter: Dispatch<string>
  resetCategoryFilter: () => void
}

export const CategoryFilterContext = createContext<ContextValue | undefined>(
  undefined
)
CategoryFilterContext.displayName = 'CategoryFilterContext'

interface ProviderProps {
  children: ReactNode
}

export const CategoryFilterProvider: FC<ProviderProps> = ({ children }) => {
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
    'useCategoryFilter must be used within a CategoryFilterProvider'
  )
  return context
}
