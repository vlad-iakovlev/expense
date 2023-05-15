import { useCallback } from 'react'
import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { parseAmount } from '../../../utils/parseAmount.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operationId: string
}

export const ExpenseAmount: React.FC<Props> = ({ operationId }) => {
  const { operation, setOperationExpenseAmount } = useOperation({ operationId })

  const handleChange = useCallback(
    (amountString: string) => {
      const amount = parseAmount(amountString)
      if (!isNaN(amount)) setOperationExpenseAmount(amount)
    },
    [setOperationExpenseAmount]
  )

  if (!operation.expenseWallet) {
    return null
  }

  return (
    <Card.Input
      className="text-red-700"
      label="Amount"
      value={formatAmount(operation.expenseAmount)}
      onChange={handleChange}
    />
  )
}
