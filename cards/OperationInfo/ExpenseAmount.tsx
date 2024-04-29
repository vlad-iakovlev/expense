import React from 'react'
import { Card } from '@/components/common/Card/index.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'
import { formatAmount } from '@/utils/formatAmount.js'
import { parseAmount } from '@/utils/parseAmount.js'

interface ExpenseAmountProps {
  operationId: string
}

export const ExpenseAmount = ({ operationId }: ExpenseAmountProps) => {
  const { operation, setOperationExpenseAmount } = useOperation({ operationId })

  const handleChange = React.useCallback(
    (amountString: string) => {
      const amount = parseAmount(amountString)
      if (!isNaN(amount)) setOperationExpenseAmount(amount)
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
      value={formatAmount(operation.expenseAmount)}
      onChange={handleChange}
    />
  )
}
