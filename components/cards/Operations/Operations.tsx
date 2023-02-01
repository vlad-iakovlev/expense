import { PlusIcon } from '@heroicons/react/24/solid'
import { FC, useCallback } from 'react'
import { mutate } from 'swr'
import { createOperation } from '../../../api/client/operations'
import { SWR_KEYS } from '../../../constants/swr'
import { useOperationsContext } from '../../contexts/Operations'
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
    <Card className="md:col-span-2">
      <Card.Title title="Operations" />

      <Card.Divider />

      {query.walletId ? (
        <Card.Button
          end={<PlusIcon className="w-5 h-5" />}
          onClick={handleCreateOperation}
        >
          Create Operation
        </Card.Button>
      ) : null}

      {operations.map((operation) => (
        <OperationsItem
          key={operation.id}
          operation={operation}
          walletType={query.walletId ? 'button' : 'column'}
        />
      ))}
    </Card>
  )
}
