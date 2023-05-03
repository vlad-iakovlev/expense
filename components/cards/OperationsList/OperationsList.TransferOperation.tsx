import { ArrowRightIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { clsx } from 'clsx'
import { FC } from 'react'
import { PopulatedClientOperation } from '../../../types/client.ts'
import { formatDate } from '../../../utils/formatDate.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'

interface Props {
  operation: PopulatedClientOperation
  walletId: string | undefined
}

export const TransferOperation: FC<Props> = ({ operation, walletId }) => {
  assert(operation.incomeWallet, 'Income wallet is not defined')
  assert(operation.expenseWallet, 'Expense wallet is not defined')

  return (
    <>
      <div className="truncate">
        {operation.category} – {operation.name}
      </div>

      <div className="text-sm text-zinc-600">{formatDate(operation.date)}</div>

      <div className="flex items-center gap-3 mt-2">
        <div className="flex-1 min-w-0">
          <Amount
            className="font-medium"
            amount={operation.expenseAmount}
            currency={operation.expenseWallet.currency}
            type="expense"
          />

          <div
            className={clsx('text-sm truncate', {
              'font-medium': operation.expenseWallet.id === walletId,
              'text-zinc-600': operation.expenseWallet.id !== walletId,
            })}
          >
            {operation.expenseWallet.name}
          </div>
        </div>

        <ArrowRightIcon className="flex-none w-5 h-5" />

        <div className="flex-1 min-w-0 text-right">
          <Amount
            className="font-medium"
            amount={operation.incomeAmount}
            currency={operation.incomeWallet.currency}
            type="income"
          />

          <div
            className={clsx('text-sm truncate', {
              'font-medium': operation.incomeWallet.id === walletId,
              'text-zinc-600': operation.incomeWallet.id !== walletId,
            })}
          >
            {operation.incomeWallet.name}
          </div>
        </div>
      </div>
    </>
  )
}
