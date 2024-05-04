import React from 'react'
import { Card } from '@/components/common/Card/index.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'
import { Decimal } from '@/utils/Decimal.js'

interface ExpenseAmountProps {
  operationId: string
}

export const ExpenseAmount = ({ operationId }: ExpenseAmountProps) => {
  const { operation, setOperationExpenseAmount } = useOperation({ operationId })

  const handleChange = React.useCallback(
    (value: string) => {
      setOperationExpenseAmount(Decimal.fromString(value).abs())
    },
    [setOperationExpenseAmount],
  )

  if (!operation.expenseWallet) {
    return null
  }

  return (
    <Card.Input
      valueClassName="text-red-700 dark:text-red-500"
      label="Amount"
      value={operation.expenseAmount.toFixed(2)}
      onChange={handleChange}
    />
  )
}
