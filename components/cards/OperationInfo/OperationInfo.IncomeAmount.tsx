import { useCallback } from 'react'
import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.js'
import { formatAmount } from '../../../utils/formatAmount.js'
import { parseAmount } from '../../../utils/parseAmount.js'
import { Card } from '../../ui-kit/Card/Card.jsx'

interface Props {
  operationId: string
}

export const IncomeAmount = ({ operationId }: Props) => {
  const { operation, setOperationIncomeAmount } = useOperation({ operationId })

  const handleChange = useCallback(
    (amountString: string) => {
      const amount = parseAmount(amountString)
      if (!isNaN(amount)) setOperationIncomeAmount(amount)
    },
    [setOperationIncomeAmount],
  )

  if (!operation.incomeWallet) {
    return null
  }

  return (
    <Card.Input
      valueClassName="text-green-700 dark:text-green-500"
      label="Amount"
      value={formatAmount(operation.incomeAmount)}
      onChange={handleChange}
    />
  )
}
