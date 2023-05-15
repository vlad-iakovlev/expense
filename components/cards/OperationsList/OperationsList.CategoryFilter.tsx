import { XMarkIcon } from '@heroicons/react/20/solid'
import { FC, MouseEvent, useCallback, useEffect, useMemo } from 'react'
import { useCategories } from '../../../stores/RootStore/hooks/useCategories.ts'
import { Card, CardSelectItem } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string | undefined
  walletId: string | undefined
  value: string
  onChange: (value: string) => void
}

export const CategoryFilter: FC<Props> = ({
  groupId,
  walletId,
  value,
  onChange,
}) => {
  const { categories } = useCategories({ groupId, walletId })

  const options = useMemo<CardSelectItem[]>(() => {
    return categories.map<CardSelectItem>((category) => ({
      id: category,
      label: category,
    }))
  }, [categories])

  const valueForSelect = useMemo(() => {
    return {
      id: value,
      label: value || 'Show all',
    }
  }, [value])

  const handleReset = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      onChange('')
    },
    [onChange]
  )

  useEffect(() => {
    if (categories.length < 2) {
      onChange('')
    }
  }, [categories.length, onChange])

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
        onChange={onChange}
        suffix={
          !!value && (
            <div
              className="flex-none flex items-center justify-center h-8 w-8 -mx-1 rounded-full bg-zinc-200 shadow-sm hover:bg-zinc-600 hover:text-white transition-colors"
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
