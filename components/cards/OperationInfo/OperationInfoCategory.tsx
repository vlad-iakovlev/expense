import { FC } from 'react'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoCategory: FC = () => {
  const { operation } = useOperationContext()

  return (
    <Card.Button
      disabled
      end={<div className="font-medium">{operation.category}</div>}
    >
      Category
    </Card.Button>
  )
}
