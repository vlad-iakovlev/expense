import assert from 'assert'
import { PopulatedClientOperation } from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { formatTime } from '../../../utils/formatDate.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'

interface Props {
  operation: PopulatedClientOperation
  walletId: string | undefined
}

export const ExpenseOperation = ({ operation, walletId }: Props) => {
  assert(operation.expenseWallet, 'Expense wallet is not defined')

  return (
    <div
      aria-label={[
        'Expense',
        `at ${formatTime(operation.date)}`,
        operation.category,
        operation.name,
        `${formatAmount(operation.expenseAmount)} ${
          operation.expenseWallet.currency.name ??
          operation.expenseWallet.currency.symbol
        }`,
        walletId ? '' : `wallet ${operation.expenseWallet.name}`,
      ].join(', ')}
    >
      <div className="flex items-center gap-3">
        <div className="flex-auto truncate">
          {operation.category} – {operation.name}
        </div>
        <Amount
          className="flex-none font-medium"
          amount={operation.expenseAmount}
          currency={operation.expenseWallet.currency}
          type="expense"
          showSign="non-zero"
        />
      </div>

      <div className="flex items-center gap-3 text-sm text-zinc-600">
        <div className="flex-none">{formatTime(operation.date)}</div>
        {!walletId && (
          <div className="flex-auto min-w-0 text-right truncate">
            {operation.expenseWallet.name}
          </div>
        )}
      </div>
    </div>
  )
}
