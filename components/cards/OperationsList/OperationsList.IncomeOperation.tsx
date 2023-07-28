import assert from 'assert'
import { PopulatedClientOperation } from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { formatTime } from '../../../utils/formatDate.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'

interface Props {
  operation: PopulatedClientOperation
  walletId: string | undefined
}

export const IncomeOperation = ({ operation, walletId }: Props) => {
  assert(operation.incomeWallet, 'Income wallet is not defined')

  return (
    <div
      aria-label={[
        'Income',
        `at ${formatTime(operation.date)}`,
        operation.category,
        operation.name,
        `${formatAmount(operation.incomeAmount)} ${
          operation.incomeWallet.currency.name ??
          operation.incomeWallet.currency.symbol
        }`,
        walletId ? '' : `wallet ${operation.incomeWallet.name}`,
      ].join(', ')}
    >
      <div className="flex items-center gap-3">
        <div className="flex-auto truncate">
          {operation.category} – {operation.name}
        </div>
        <Amount
          className="flex-none font-medium"
          amount={operation.incomeAmount}
          currency={operation.incomeWallet.currency}
          type="income"
          showSign="non-zero"
        />
      </div>

      <div className="flex items-center gap-3 text-sm text-zinc-600">
        <div className="flex-none">{formatTime(operation.date)}</div>
        {!walletId && (
          <div className="flex-auto min-w-0 text-right truncate">
            {operation.incomeWallet.name}
          </div>
        )}
      </div>
    </div>
  )
}
