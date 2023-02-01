import { FC } from 'react'
import { formatAmount } from '../../../utils/formatAmount'
import { formatDate } from '../../../utils/formatDate'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoCard: FC = () => {
  const { operation } = useOperationContext()

  return (
    <Card>
      <Card.Title title="Info" />

      <Card.Divider />

      <Card.Button
        end={<div className="font-medium">{formatDate(operation.date)}</div>}
      >
        Date
      </Card.Button>

      <Card.Button
        end={<div className="font-medium">{operation.wallet.name}</div>}
      >
        Wallet
      </Card.Button>

      <Card.Button
        end={<div className="font-medium">{operation.category}</div>}
      >
        Category
      </Card.Button>

      <Card.Button
        end={<div className="font-medium">{operation.description}</div>}
      >
        Description
      </Card.Button>

      <Card.Button
        end={
          <div className="font-medium">
            {formatAmount(operation.amount, operation.wallet.currency)}
          </div>
        }
      >
        Amount
      </Card.Button>
    </Card>
  )
}
