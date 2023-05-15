import { XMarkIcon } from '@heroicons/react/20/solid'
import { useCallback, useEffect, useMemo } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'
import { useCategories } from '../../../contexts/RootStore/hooks/useCategories.ts'
import { Card, CardSelectItem } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string | undefined
  walletId: string | undefined
}

export const CategoryFilter: React.FC<Props> = ({ groupId, walletId }) => {
  const { categoryFilter, setCategoryFilter, resetCategoryFilter } =
    useCategoryFilter()
  const { categories } = useCategories({ groupId, walletId })

  const options = useMemo<CardSelectItem[]>(() => {
    return categories.map<CardSelectItem>((category) => ({
      id: category,
      label: category,
    }))
  }, [categories])

  const valueForSelect = useMemo(() => {
    return {
      id: categoryFilter,
      label: categoryFilter || 'Show all',
    }
  }, [categoryFilter])

  const handleReset = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      resetCategoryFilter()
    },
    [resetCategoryFilter]
  )

  useEffect(() => {
    if (categories.length < 2) {
      resetCategoryFilter()
    }
  }, [categories.length, resetCategoryFilter])

  if (categories.length < 2) {
    return null
  }

  return (
    <>
      <Card.Divider />
      <Card.Select
        label="Category"
        options={options}
        value={valueForSelect}
        onChange={setCategoryFilter}
        suffix={
          !!categoryFilter && (
            <div
              className="flex-none flex items-center justify-center h-8 w-8 rounded-full shadow-inner bg-zinc-200 hover:bg-zinc-300 transition-colors"
              tabIndex={0}
              role="button"
              onClick={handleReset}
            >
              <XMarkIcon className="w-4 h-4" />
            </div>
          )
        }
      />
    </>
  )
}
