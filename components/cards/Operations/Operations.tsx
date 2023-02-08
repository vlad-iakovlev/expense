import { ArrowRightIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { createOperation } from '../../../api/client/operations'
import { ClientOperation } from '../../../api/types/operations'
import { ROUTES } from '../../../constants/routes'
import { formatDate } from '../../../utils/formatDate'
import { useOperationsContext } from '../../contexts/Operations'
import { Amount } from '../../ui-kit/Amount'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'

export const OperationsCard: FC = () => {
  const router = useRouter()
  const { operations, operationsQuery } = useOperationsContext()

  const goToOperation = useCallback(
    async (operationId: string) => {
      await router.push(ROUTES.OPERATION(operationId))
    },
    [router]
  )

  const handleCreate = useCallback(async () => {
    if (!operationsQuery.walletId) return

    const { operation } = await createOperation({
      name: 'Untitled',
      category: 'No category',
      date: new Date().toISOString(),
      incomeAmount: 0,
      expenseAmount: 0,
      incomeWalletId: operationsQuery.walletId,
      expenseWalletId: null,
    })

    await goToOperation(operation.id)
  }, [goToOperation, operationsQuery.walletId])

  const getOperation = useCallback(
    (operation: ClientOperation) => {
      if (operation.incomeWallet && operation.expenseWallet) {
        return (
          <Card.Button
            key={operation.id}
            onClick={() => goToOperation(operation.id)}
          >
            <div className="truncate">
              {operation.category} – {operation.name}
            </div>

            <div className="text-sm text-zinc-600">
              {formatDate(operation.date)}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 min-w-0">
                <Amount
                  className="font-medium"
                  amount={operation.expenseAmount}
                  currency={operation.expenseWallet.currency}
                  type="expense"
                />
                <div className="text-sm text-zinc-600 truncate">
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
                <div className=" text-sm text-zinc-600 truncate">
                  {operation.incomeWallet.name}
                </div>
              </div>
            </div>
          </Card.Button>
        )
      }

      if (operation.incomeWallet) {
        return (
          <Card.Button
            key={operation.id}
            onClick={() => goToOperation(operation.id)}
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
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-zinc-600">
              <div className="flex-none">{formatDate(operation.date)}</div>
              {!operationsQuery.walletId && (
                <div className="flex-auto min-w-0 text-right truncate">
                  {operation.incomeWallet.name}
                </div>
              )}
            </div>
          </Card.Button>
        )
      }

      if (operation.expenseWallet) {
        return (
          <Card.Button
            key={operation.id}
            onClick={() => goToOperation(operation.id)}
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
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-zinc-600">
              <div className="flex-none">{formatDate(operation.date)}</div>
              {!operationsQuery.walletId && (
                <div className="flex-auto min-w-0 text-right truncate">
                  {operation.expenseWallet.name}
                </div>
              )}
            </div>
          </Card.Button>
        )
      }
    },
    [goToOperation, operationsQuery.walletId]
  )

  if (!operationsQuery.walletId && !operations.length) {
    return null
  }

  return (
    <Card>
      <Card.Title
        title="Operations"
        action={
          operationsQuery.walletId ? (
            <Button
              rounded
              size="sm"
              iconStart={<PlusIcon />}
              onClick={handleCreate}
            />
          ) : undefined
        }
      />

      {operations.length ? <Card.Divider /> : null}

      {operations.map(getOperation)}
    </Card>
  )
}
