import { FC, useCallback } from 'react'
import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.ts'
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
      const amount = parseAmount(amountString)
      if (!isNaN(amount)) setOperationIncomeAmount(amount)
    },
    [setOperationIncomeAmount]
  )

  if (!operation.incomeWallet) {
    return null
  }

  return (
    <Card.Input
      className="text-green-700"
      label="Amount"
      value={formatAmount(operation.incomeAmount)}
      onChange={handleChange}
    />
  )
}
