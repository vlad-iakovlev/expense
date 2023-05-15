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
  category: string
  setCategory: Dispatch<string>
  resetCategory: () => void
}

export const CategoryFilterContext = createContext<ContextValue | undefined>(
  undefined
)
CategoryFilterContext.displayName = 'CategoryFilterContext'

interface ProviderProps {
  children: ReactNode
}

export const CategoryFilterProvider: FC<ProviderProps> = ({ children }) => {
  const [category, setCategory] = useState('')

  const resetCategory = useCallback(() => setCategory(''), [])

  return (
    <CategoryFilterContext.Provider
      value={{ category, setCategory, resetCategory }}
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
