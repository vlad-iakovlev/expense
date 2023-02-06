import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { formatAmount } from '../../../utils/formatAmount'
import { parseAmount } from '../../../utils/parseAmount'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoExpenseAmount: FC = () => {
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (amountString: string) => {
      if (!operation.expenseWallet) return

      const amount = parseAmount(amountString, operation.expenseWallet.currency)
      if (isNaN(amount)) {
        return formatAmount(
          operation.expenseAmount,
          operation.expenseWallet.currency
        )
      }

      await updateOperation({
        operationId: operation.id,
        expenseAmount: amount,
      })

      await mutateOperation()

      return formatAmount(amount, operation.expenseWallet.currency)
    },
    [
      mutateOperation,
      operation.expenseAmount,
      operation.expenseWallet,
      operation.id,
    ]
  )

  if (!operation.expenseWallet) return null

  return (
    <Card.Input
      className="text-red-700"
      name={operation.incomeWallet ? 'Expense Amount' : 'Amount'}
      value={formatAmount(
        operation.expenseAmount,
        operation.expenseWallet.currency
      )}
      onChange={handleChange}
    />
  )
}
