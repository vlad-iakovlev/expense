import assert from 'assert'
import { FC } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { PopulatedClientOperation } from '../../../types/client.ts'
import { formatDate } from '../../../utils/formatDate.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operation: PopulatedClientOperation
  walletId: string | undefined
}

export const ExpenseOperation: FC<Props> = ({ operation, walletId }) => {
  assert(operation.expenseWallet, 'Expense wallet is not defined')

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
        {!walletId && (
          <div className="flex-auto min-w-0 text-right truncate">
            {operation.expenseWallet.name}
          </div>
        )}
      </div>
    </Card.Link>
  )
}
