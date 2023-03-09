import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { formatAmount } from '../../../utils/formatAmount'
import { parseAmount } from '../../../utils/parseAmount'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoIncomeAmount: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operationResponse, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (amountString: string) => {
      if (!operationResponse?.operation.incomeWallet) return

      try {
        setLoading(true)

        const amount = parseAmount(
          amountString,
          operationResponse.operation.incomeWallet.currency
        )
        if (isNaN(amount)) return

        await updateOperation({
          operationId: operationResponse.operation.id,
          incomeAmount: amount,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operationResponse, setLoading]
  )

  if (!operationResponse?.operation.incomeWallet) {
    return null
  }

  return (
    <Card.Input
      className="text-green-700"
      name="Amount"
      value={formatAmount(
        operationResponse.operation.incomeAmount,
        operationResponse.operation.incomeWallet.currency
      )}
      onChange={handleChange}
    />
  )
}
