import { ArrowRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { ClientOperation } from '../../../api/types/operations'
import { ROUTES } from '../../../constants/routes'
import { formatDate } from '../../../utils/formatDate'
import { useOperationsContext } from '../../contexts/Operations'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

interface Props {
  operation: ClientOperation
}

export const OperationsTransferItem: FC<Props> = ({ operation }) => {
  const router = useRouter()
  const { operationsQuery } = useOperationsContext()

  const handleClick = useCallback(async () => {
    await router.push(ROUTES.OPERATION(operation.id))
  }, [operation.id, router])

  if (!operation.incomeWallet || !operation.expenseWallet) {
    return null
  }

  return (
    <Card.Button onClick={handleClick}>
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
              'font-medium':
                operationsQuery.walletId === operation.expenseWallet.id,
              'text-zinc-600':
                operationsQuery.walletId !== operation.expenseWallet.id,
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
              'font-medium':
                operationsQuery.walletId === operation.incomeWallet.id,
              'text-zinc-600':
                operationsQuery.walletId !== operation.incomeWallet.id,
            })}
          >
            {operation.incomeWallet.name}
          </div>
        </div>
      </div>
    </Card.Button>
  )
}
