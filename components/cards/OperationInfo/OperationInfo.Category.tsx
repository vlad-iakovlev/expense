import assert from 'assert'
import { FC, useMemo } from 'react'
import { useCategories } from '../../../stores/RootStore/hooks/useCategories.ts'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { CountBadge } from '../../ui-kit/CountBadge/CountBadge.tsx'

interface Props {
  operationId: string
}

export const Category: FC<Props> = ({ operationId }) => {
  const { operation, setOperationCategory } = useOperation({ operationId })

  const groupId = useMemo(() => {
    const wallet = operation.incomeWallet ?? operation.expenseWallet
    assert(wallet, 'Wallet not found')
    return wallet.group.id
  }, [operation.expenseWallet, operation.incomeWallet])

  const { categories } = useCategories({ groupId })

  const suggestions = useMemo(() => {
    return categories.map((category) => ({
      id: category.name,
      label: category.name,
      suffix: <CountBadge count={category.operationsCount} />,
    }))
  }, [categories])

  return (
    <Card.Input
      label="Category"
      suggestions={suggestions}
      value={operation.category}
      onChange={setOperationCategory}
    />
  )
}
