import assert from 'assert'
import React from 'react'
import { Card } from '@/components/common/Card/index'
import { useCategories } from '@/contexts/RootStore/hooks/useCategories'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

interface CategoryProps {
  operationId: string
}

export const Category = ({ operationId }: CategoryProps) => {
  const { operation, setOperationCategory } = useOperation({ operationId })

  const groupId = React.useMemo(() => {
    const wallet = operation.incomeWallet ?? operation.expenseWallet
    assert(wallet, 'Wallet not found')
    return wallet.group.id
  }, [operation.expenseWallet, operation.incomeWallet])

  const { categories } = useCategories({ groupId })

  return (
    <Card.Input
      label="Category"
      suggestions={categories}
      value={operation.category}
      onChange={setOperationCategory}
    />
  )
}
