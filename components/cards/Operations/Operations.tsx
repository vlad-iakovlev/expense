import { PlusIcon } from '@heroicons/react/24/solid'
import { FC, useCallback } from 'react'
import { mutate } from 'swr'
import { createOperation } from '../../../api/client/operations'
import { SWR_KEYS } from '../../../constants/swr'
import { useOperationsContext } from '../../contexts/Operations'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { OperationsItem } from './OperationsItem'

export const OperationsCard: FC = () => {
  const { query, operations } = useOperationsContext()

  const handleCreateOperation = useCallback(async () => {
    if (!query.walletId) return

    await createOperation({
      description: 'Untitled',
      date: new Date().toISOString(),
      amount: 0,
      category: 'No category',
      walletId: query.walletId,
    })

    await mutate(SWR_KEYS.OPERATIONS(query))
  }, [query])

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
        <OperationsItem
          key={operation.id}
          operation={operation}
          walletId={query.walletId}
        />
      ))}
    </Card>
  )
}
