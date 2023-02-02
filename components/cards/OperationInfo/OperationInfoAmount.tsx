import { FC } from 'react'
import { formatAmount } from '../../../utils/formatAmount'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoAmount: FC = () => {
  const { operation } = useOperationContext()

  return (
    <Card.Button
      end={
        <div className="font-medium">
          {formatAmount(operation.amount, operation.wallet.currency)}
        </div>
      }
    >
      Amount
    </Card.Button>
  )
}
