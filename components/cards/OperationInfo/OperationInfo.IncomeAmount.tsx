import assert from 'assert'
import { FC, useCallback } from 'react'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { parseAmount } from '../../../utils/parseAmount.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operationId: string
}

export const IncomeAmount: FC<Props> = ({ operationId }) => {
  const { operation, setOperationIncomeAmount } = useOperation({ operationId })

  const handleChange = useCallback(
    (amountString: string) => {
      assert(operation.incomeWallet, 'incomeWallet is not defined')

      const amount = parseAmount(amountString, operation.incomeWallet.currency)
      if (isNaN(amount)) return
      setOperationIncomeAmount(amount)
    },
    [operation.incomeWallet, setOperationIncomeAmount]
  )

  if (!operation.incomeWallet) {
    return null
  }

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
