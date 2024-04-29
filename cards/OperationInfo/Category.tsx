import assert from 'assert'
import { useMemo } from 'react'
import { Card } from '@/components/common/Card/index.jsx'
import { useCategories } from '@/contexts/RootStore/hooks/useCategories.js'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'

interface Props {
  operationId: string
}

export const Category = ({ operationId }: Props) => {
  const { operation, setOperationCategory } = useOperation({ operationId })

  const groupId = useMemo(() => {
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
