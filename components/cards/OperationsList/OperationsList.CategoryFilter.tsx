import { XMarkIcon } from '@heroicons/react/20/solid'
import { FC, MouseEvent, useCallback, useEffect, useMemo } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'
import { useCategories } from '../../../contexts/RootStore/hooks/useCategories.ts'
import { Card, CardSelectItem } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string | undefined
  walletId: string | undefined
}

export const CategoryFilter: FC<Props> = ({ groupId, walletId }) => {
  const { category, setCategory, resetCategory } = useCategoryFilter()
  const { categories } = useCategories({ groupId, walletId })

  const options = useMemo<CardSelectItem[]>(() => {
    return categories.map<CardSelectItem>((category) => ({
      id: category,
      label: category,
    }))
  }, [categories])

  const valueForSelect = useMemo(() => {
    return {
      id: category,
      label: category || 'Show all',
    }
  }, [category])

  const handleReset = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      resetCategory()
    },
    [resetCategory]
  )

  useEffect(() => {
    if (categories.length < 2) {
      resetCategory()
    }
  }, [categories.length, resetCategory])

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
        onChange={setCategory}
        suffix={
          !!category && (
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
