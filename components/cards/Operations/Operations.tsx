import { PlusIcon } from '@heroicons/react/24/solid'
import { FC, useCallback, useState } from 'react'
import { useOperationsContext } from '../../contexts/Operations'
import { Card } from '../../ui-kit/Card'

export const OperationsCard: FC = () => {
  const { query, operations } = useOperationsContext()

  const [isCreatingOperation, setIsCreatingOperation] = useState(false)

  const handleCreateOperation = useCallback(async () => {
    setIsCreatingOperation(true)
  }, [])

  if (!query.walletId && !operations.length) {
    return null
  }

  return (
    <Card className="md:col-span-2">
      <Card.Title title="Operations" />

      <Card.Divider />

      {operations.map((operation) => (
        <div key={operation.id} />
      ))}

      {query.walletId && !isCreatingOperation ? (
        <Card.Button
          end={<PlusIcon className="w-5 h-5" />}
          onClick={handleCreateOperation}
        >
          Create Operation
        </Card.Button>
      ) : null}
    </Card>
  )
}
