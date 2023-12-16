import { useCallback } from 'react'
import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.js'
import { formatAmount } from '../../../utils/formatAmount.js'
import { parseAmount } from '../../../utils/parseAmount.js'
import { Card } from '../../ui-kit/Card/Card.jsx'

interface Props {
  operationId: string
}

export const ExpenseAmount = ({ operationId }: Props) => {
  const { operation, setOperationExpenseAmount } = useOperation({ operationId })

  const handleChange = useCallback(
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
      valueClassName="text-red-700"
      label="Amount"
      value={formatAmount(operation.expenseAmount)}
      onChange={handleChange}
    />
  )
}
