import { FC } from 'react'
import { ClientOperation } from '../../../api/types/operations.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { formatDate } from '../../../utils/formatDate.ts'
import { useOperationsContext } from '../../contexts/Operations.tsx'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operation: ClientOperation
}

export const OperationsExpenseItem: FC<Props> = ({ operation }) => {
  const { operationsPayload } = useOperationsContext()

  if (!operation.expenseWallet) {
    return null
  }

  return (
    <Card.Link href={ROUTES.OPERATION(operation.id)}>
      <div className="flex items-center gap-3">
        <div className="flex-auto truncate">
          {operation.category} – {operation.name}
        </div>
        <Amount
          className="flex-none font-medium"
          amount={operation.expenseAmount}
          currency={operation.expenseWallet.currency}
          type="expense"
        />
      </div>

      <div className="flex items-center gap-3 text-sm text-zinc-600">
        <div className="flex-none">{formatDate(operation.date)}</div>
        {!operationsPayload.walletId && (
          <div className="flex-auto min-w-0 text-right truncate">
            {operation.expenseWallet.name}
          </div>
        )}
      </div>
    </Card.Link>
  )
}
