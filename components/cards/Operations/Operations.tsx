import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { createOperation } from '../../../api/client/operations'
import { ROUTES } from '../../../constants/routes'
import { formatAmount } from '../../../utils/formatAmount'
import { formatDate } from '../../../utils/formatDate'
import { useOperationsContext } from '../../contexts/Operations'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'

export const OperationsCard: FC = () => {
  const { query, operations } = useOperationsContext()

  const router = useRouter()

  const goToOperation = useCallback(
    async (operationId: string) => {
      await router.push(ROUTES.OPERATION(operationId))
    },
    [router]
  )

  const handleCreateOperation = useCallback(async () => {
    if (!query.walletId) return

    const { operation } = await createOperation({
      name: 'Untitled',
      date: new Date().toISOString(),
      amount: 0,
      category: 'No category',
      walletId: query.walletId,
    })

    await goToOperation(operation.id)
  }, [goToOperation, query.walletId])

  if (!query.walletId && !operations.length) {
    return null
  }

  return (
    <Card>
      <Card.Title
        title="Operations"
        action={
          query.walletId ? (
            <Button
              rounded
              size="sm"
              iconStart={<PlusIcon />}
              onClick={handleCreateOperation}
            />
          ) : undefined
        }
      />

      {operations.length ? <Card.Divider /> : null}

      {operations.map((operation) => (
        <Card.Button
          key={operation.id}
          onClick={() => goToOperation(operation.id)}
        >
          <div className="flex items-center gap-3">
            <div className="flex-auto truncate">
              {operation.category} – {operation.name}
            </div>
            <div className="flex-none font-medium">
              {formatAmount(operation.amount, operation.wallet.currency)}
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <div className="flex-none win-w-0">
              {formatDate(operation.date)}
            </div>
            {!query.walletId && (
              <div className="flex-auto min-w-0 text-right truncate">
                {operation.wallet.name}
              </div>
            )}
          </div>
        </Card.Button>
      ))}
    </Card>
  )
}
