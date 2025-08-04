import { useCallback } from 'react'
import { Card } from '@/components/common/Card/index'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'
import { Decimal } from '@/utils/Decimal'

type ExpenseAmountProps = {
  operationId: string
}

export const ExpenseAmount = ({ operationId }: ExpenseAmountProps) => {
  const { operation, setOperationExpenseAmount } = useOperation({ operationId })

  const handleChange = useCallback(
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
      value={operation.expenseAmount.toFixed(
        operation.expenseWallet.currency.fractionalDigits,
      )}
      onChange={handleChange}
    />
  )
}
