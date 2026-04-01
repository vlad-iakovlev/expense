import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { twMerge } from 'tailwind-merge'
import { Amount } from '@/components/common/Amount'
import { PopulatedClientOperation } from '@/types/client'
import { formatTime } from '@/utils/formatDate'

type TransferOperationProps = {
  operation: PopulatedClientOperation
  walletId: string | undefined
}

export const TransferOperation = ({
  operation,
  walletId,
}: TransferOperationProps) => {
  if (!operation.incomeWallet) throw new Error('Income wallet is not defined')
  if (!operation.expenseWallet) throw new Error('Expense wallet is not defined')

  return (
    <div
      aria-label={[
        'Transfer',
        `at ${formatTime(operation.date)}`,
        operation.category,
        operation.name,
        `${operation.expenseAmount.toFixed(operation.expenseWallet.currency.fractionalDigits)} ${operation.expenseWallet.currency.name} from wallet ${operation.expenseWallet.name}`,
        `${operation.incomeAmount.toFixed(operation.incomeWallet.currency.fractionalDigits)} ${operation.incomeWallet.currency.name} to wallet ${operation.incomeWallet.name}`,
      ].join(', ')}
    >
      <div className="truncate">
        {operation.category} – {operation.name}
      </div>

      <div className="text-sm text-tertiary-foreground">
        {formatTime(operation.date)}
      </div>

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
                : 'text-tertiary-foreground',
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
                : 'text-tertiary-foreground',
            )}
          >
            {operation.incomeWallet.name}
          </div>
        </div>
      </div>
    </div>
  )
}
