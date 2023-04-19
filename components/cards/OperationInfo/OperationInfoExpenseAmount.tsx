import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { parseAmount } from '../../../utils/parseAmount.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationContext } from '../../contexts/Operation.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

export const OperationInfoExpenseAmount: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operationResponse, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (amountString: string) => {
      if (!operationResponse?.operation.expenseWallet) return

      try {
        setLoading(true)

        const amount = parseAmount(
          amountString,
          operationResponse.operation.expenseWallet.currency
        )
        if (isNaN(amount)) return

        await updateOperation({
          operationId: operationResponse.operation.id,
          expenseAmount: amount,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operationResponse, setLoading]
  )

  if (!operationResponse) {
    return <Card.Skeleton />
  }

  if (!operationResponse.operation.expenseWallet) {
    return null
  }

  return (
    <Card.Input
      className="text-red-700"
      name="Amount"
      value={formatAmount(
        operationResponse.operation.expenseAmount,
        operationResponse.operation.expenseWallet.currency
      )}
      onChange={handleChange}
    />
  )
}
