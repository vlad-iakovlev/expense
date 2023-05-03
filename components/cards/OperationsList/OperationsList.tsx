import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useOperations } from '../../../stores/RootStore/hooks/useOperations.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { CategoryFilter } from './OperationsList.CategoryFilter.tsx'
import { Create } from './OperationsList.Create.tsx'
import { Operation } from './OperationsList.Operation.tsx'

interface Props {
  className?: string
  groupId?: string
  walletId?: string
}

const PAGE_SIZE = 10

export const OperationsListCard: FC<Props> = ({
  className,
  groupId,
  walletId,
}) => {
  const [category, setCategory] = useState<string>('')
  const { operationIds } = useOperations({ groupId, walletId, category })

  const [take, setTake] = useState(PAGE_SIZE)
  useEffect(() => setTake(PAGE_SIZE), [category])

  const canShowMore = useMemo(() => {
    return take < operationIds.length
  }, [operationIds.length, take])

  const handleShowMore = useCallback(() => {
    setTake((prevTake) => prevTake + PAGE_SIZE)
  }, [])

  if (!walletId && !category && !operationIds.length) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title title="Operations" action={<Create walletId={walletId} />} />

      {(!!category || !!operationIds.length) && (
        <>
          <Card.Divider />
          <CategoryFilter category={category} setCategory={setCategory} />
        </>
      )}

      {!!operationIds.length && (
        <>
          <Card.Divider />
          {operationIds.slice(0, take).map((operationId) => (
            <Operation
              key={operationId}
              operationId={operationId}
              walletId={walletId}
            />
          ))}
        </>
      )}

      {canShowMore ? (
        <>
          <Card.Divider />
          <Card.Button
            start={<EllipsisHorizontalIcon className="w-6 h-6" />}
            onClick={handleShowMore}
          >
            Show more
          </Card.Button>
        </>
      ) : null}
    </Card>
  )
}
