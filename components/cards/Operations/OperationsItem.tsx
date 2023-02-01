import { format } from 'date-fns'
import { FC } from 'react'
import { ClientOperation } from '../../../api/types/operations'
import { formatAmount } from '../../../utils/formatAmount'
import { Card } from '../../ui-kit/Card'

interface Props {
  operation: ClientOperation
  walletId?: string
}

export const OperationsItem: FC<Props> = ({ operation, walletId }) => {
  return (
    <Card.Button>
      <div className="flex items-center gap-3">
        <div className="flex-auto truncate">
          {operation.category} – {operation.description}
        </div>
        <div className="font-medium truncate">
          {formatAmount(operation.amount, operation.wallet.currency)}
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm text-zinc-600">
        <div className="flex-auto win-w-0 truncate">
          {format(new Date(operation.date), "dd.MM 'at' HH:mm")}
        </div>
        {!walletId && (
          <div className="min-w-0 truncate">{operation.wallet.name}</div>
        )}
      </div>
    </Card.Button>
  )
}
