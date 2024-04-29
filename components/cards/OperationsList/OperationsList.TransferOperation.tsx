import { ArrowRightIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { twMerge } from 'tailwind-merge'
import { Amount } from '@/components/ui-kit/Amount/Amount.jsx'
import { PopulatedClientOperation } from '@/types/client.js'
import { formatAmount } from '@/utils/formatAmount.js'
import { formatTime } from '@/utils/formatDate.js'

interface Props {
  operation: PopulatedClientOperation
  walletId: string | undefined
}

export const TransferOperation = ({ operation, walletId }: Props) => {
  assert(operation.incomeWallet, 'Income wallet is not defined')
  assert(operation.expenseWallet, 'Expense wallet is not defined')

  return (
    <div
      aria-label={[
        'Transfer',
        `at ${formatTime(operation.date)}`,
        operation.category,
        operation.name,
        `${formatAmount(operation.expenseAmount)} ${
          operation.expenseWallet.currency.name ??
          operation.expenseWallet.currency.symbol
        } from wallet ${operation.expenseWallet.name}`,
        `${formatAmount(operation.incomeAmount)} ${
          operation.incomeWallet.currency.name ??
          operation.incomeWallet.currency.symbol
        } to wallet ${operation.incomeWallet.name}`,
      ].join(', ')}
    >
      <div className="truncate">
        {operation.category} – {operation.name}
      </div>

      <div className="text-tertiary text-sm">{formatTime(operation.date)}</div>

      <div className="mt-2 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <Amount
            className="font-medium"
            amount={operation.expenseAmount}
            currency={operation.expenseWallet.currency}
            type="expense"
          />

          <div
            className={twMerge(
              'truncate text-sm',
              operation.expenseWallet.id === walletId
                ? 'font-medium'
                : 'text-tertiary',
            )}
          >
            {operation.expenseWallet.name}
          </div>
        </div>

        <ArrowRightIcon className="h-5 w-5 flex-none" />

        <div className="min-w-0 flex-1 text-right">
          <Amount
            className="font-medium"
            amount={operation.incomeAmount}
            currency={operation.incomeWallet.currency}
            type="income"
          />

          <div
            className={twMerge(
              'truncate text-sm',
              operation.incomeWallet.id === walletId
                ? 'font-medium'
                : 'text-tertiary',
            )}
          >
            {operation.incomeWallet.name}
          </div>
        </div>
      </div>
    </div>
  )
}
