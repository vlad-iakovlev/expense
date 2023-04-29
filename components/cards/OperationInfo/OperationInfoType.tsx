import { FC, useCallback } from 'react'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { ClientOperationType } from '../../../types/client.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

const OperationTypeOptionsMap: Record<
  ClientOperationType,
  CardSelectOption<ClientOperationType>
> = {
  [ClientOperationType.INCOME]: {
    id: ClientOperationType.INCOME,
    name: 'Income',
  },
  [ClientOperationType.EXPENSE]: {
    id: ClientOperationType.EXPENSE,
    name: 'Expense',
  },
  [ClientOperationType.TRANSFER]: {
    id: ClientOperationType.TRANSFER,
    name: 'Transfer',
  },
}

const options = Object.values(OperationTypeOptionsMap)

interface Props {
  operationId: string
}

export const OperationInfoType: FC<Props> = ({ operationId }) => {
  const { operation, setOperationType } = useOperation({ operationId })

  const handleChange = useCallback(
    (option: CardSelectOption<ClientOperationType>) => {
      setOperationType(option.id)
    },
    [setOperationType]
  )

  return (
    <Card.Select
      name="Type"
      options={options}
      value={OperationTypeOptionsMap[operation.type]}
      onChange={handleChange}
    />
  )
}
