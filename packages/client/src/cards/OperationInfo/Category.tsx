import { useMemo } from 'react'
import { Card } from '@/components/Card'
import { useCategories } from '@/contexts/RootStore/hooks/useCategories'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

type CategoryProps = {
  operationId: string
}

export const Category = ({ operationId }: CategoryProps) => {
  const { operation, setOperationCategory } = useOperation({ operationId })

  const groupId = useMemo(() => {
    const wallet = operation.incomeWallet ?? operation.expenseWallet
    if (!wallet) throw new Error('Wallet not found')
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
