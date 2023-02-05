import clsx from 'clsx'
import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { formatAmount } from '../../../utils/formatAmount'
import { parseAmount } from '../../../utils/parseAmount'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoAmount: FC = () => {
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (amountString: string) => {
      const amount = parseAmount(amountString, operation.wallet.currency)
      if (isNaN(amount)) {
        return formatAmount(operation.amount, operation.wallet.currency)
      }

      const sign = operation.amount >= 0 ? +1 : -1

      await updateOperation({
        operationId: operation.id,
        amount: sign * amount,
      })

      await mutateOperation()

      return formatAmount(amount, operation.wallet.currency)
    },
    [mutateOperation, operation.amount, operation.id, operation.wallet.currency]
  )

  return (
    <Card.Input
      className={clsx({
        'text-green-700': operation.amount >= 0,
        'text-red-700': operation.amount < 0,
      })}
      name="Amount"
      value={formatAmount(operation.amount, operation.wallet.currency)}
      onChange={handleChange}
    />
  )
}
