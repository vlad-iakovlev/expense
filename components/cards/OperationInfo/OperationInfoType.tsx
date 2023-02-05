import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useOperationContext } from '../../contexts/Operation'
import { Card, CardSelectOption } from '../../ui-kit/Card'

const income = { id: '+', name: 'Income' }
const expense = { id: '-', name: 'Expense' }

const options: CardSelectOption[] = [income, expense]

export const OperationInfoType: FC = () => {
  const { operation, mutateOperation } = useOperationContext()

  const value = useMemo(
    () => (operation.amount >= 0 ? income : expense),
    [operation.amount]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      let sign = 0
      if (option.id === income.id) sign = +1
      else if (option.id === expense.id) sign = -1

      await updateOperation({
        operationId: operation.id,
        amount: sign * Math.abs(operation.amount),
      })

      await mutateOperation()
    },
    [mutateOperation, operation.amount, operation.id]
  )

  return (
    <Card.Select
      name="Type"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
