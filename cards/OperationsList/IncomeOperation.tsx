import assert from 'assert'
import { Amount } from '@/components/common/Amount.jsx'
import { PopulatedClientOperation } from '@/types/client.js'
import { formatAmount } from '@/utils/formatAmount.js'
import { formatTime } from '@/utils/formatDate.js'

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

      <div className="text-tertiary flex items-center gap-3 text-sm">
        <div className="flex-none">{formatTime(operation.date)}</div>
        {!walletId && (
          <div className="min-w-0 flex-auto truncate text-right">
            {operation.incomeWallet.name}
          </div>
        )}
      </div>
    </div>
  )
}
