import { XMarkIcon } from '@heroicons/react/24/outline'
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
              className="flex-none flex items-center justify-center h-12 w-12 -m-3 touch-none"
              tabIndex={0}
              role="button"
              onClick={handleReset}
            >
              <XMarkIcon className="w-6 h-6" />
            </div>
          )
        }
      />
    </>
  )
}
