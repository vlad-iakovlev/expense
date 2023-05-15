import { FC, useEffect, useMemo } from 'react'
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
    const options = categories.map<CardSelectItem>((category) => ({
      id: category,
      label: category,
    }))

    if (value) {
      options.unshift(
        { id: '', label: 'Reset filter' },
        { type: 'divider', id: 'divider' }
      )
    }

    return options
  }, [categories, value])

  const valueForSelect = useMemo(() => {
    return {
      id: value,
      label: value || 'Show all',
    }
  }, [value])

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
      />
    </>
  )
}
