import { FC } from 'react'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoDescription: FC = () => {
  const { operation } = useOperationContext()

  return (
    <Card.Button
      end={<div className="font-medium">{operation.description}</div>}
    >
      Description
    </Card.Button>
  )
}
