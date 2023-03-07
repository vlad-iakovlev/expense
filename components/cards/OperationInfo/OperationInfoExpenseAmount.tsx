import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { formatAmount } from '../../../utils/formatAmount'
import { parseAmount } from '../../../utils/parseAmount'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoExpenseAmount: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (amountString: string) => {
      if (!operation.expenseWallet) return

      try {
        setLoading(true)

        const amount = parseAmount(
          amountString,
          operation.expenseWallet.currency
        )
        if (isNaN(amount)) return

        await updateOperation({
          operationId: operation.id,
          expenseAmount: amount,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operation.expenseWallet, operation.id, setLoading]
  )

  if (!operation.expenseWallet) {
    return null
  }

  return (
    <Card.Input
      className="text-red-700"
      name="Amount"
      value={formatAmount(
        operation.expenseAmount,
        operation.expenseWallet.currency
      )}
      onChange={handleChange}
    />
  )
}
