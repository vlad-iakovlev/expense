import { FC } from 'react'
import { formatDate } from '../../../utils/formatDate'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoDate: FC = () => {
  const { operation } = useOperationContext()

  return (
    <Card.Button
      disabled
      end={<div className="font-medium">{formatDate(operation.date)}</div>}
    >
      Date
    </Card.Button>
  )
}
