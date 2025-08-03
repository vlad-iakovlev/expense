import React from 'react'
import { Card } from '@/components/common/Card/index'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'
import { Decimal } from '@/utils/Decimal'

interface IncomeAmountProps {
  operationId: string
}

export const IncomeAmount = ({ operationId }: IncomeAmountProps) => {
  const { operation, setOperationIncomeAmount } = useOperation({ operationId })

  const handleChange = React.useCallback(
    (value: string) => {
      setOperationIncomeAmount(Decimal.fromString(value).abs())
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
      value={operation.incomeAmount.toFixed(
        operation.incomeWallet.currency.fractionalDigits,
      )}
      onChange={handleChange}
    />
  )
}
