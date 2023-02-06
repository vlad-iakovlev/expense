import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { formatAmount } from '../../../utils/formatAmount'
import { parseAmount } from '../../../utils/parseAmount'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoIncomeAmount: FC = () => {
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (amountString: string) => {
      if (!operation.incomeWallet) return

      const amount = parseAmount(amountString, operation.incomeWallet.currency)
      if (isNaN(amount)) {
        return formatAmount(
          operation.incomeAmount,
          operation.incomeWallet.currency
        )
      }

      await updateOperation({
        operationId: operation.id,
        incomeAmount: amount,
      })

      await mutateOperation()

      return formatAmount(amount, operation.incomeWallet.currency)
    },
    [
      mutateOperation,
      operation.id,
      operation.incomeAmount,
      operation.incomeWallet,
    ]
  )

  if (!operation.incomeWallet) return null

  return (
    <Card.Input
      className="text-green-700"
      name="Amount"
      value={formatAmount(
        operation.incomeAmount,
        operation.incomeWallet.currency
      )}
      onChange={handleChange}
    />
  )
}
