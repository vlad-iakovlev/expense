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

const TAKE = 10

export const OperationsListCard: FC<Props> = ({
  className,
  groupId,
  walletId,
}) => {
  const [category, setCategory] = useState<string>('')

  const { operationIds } = useOperations({ groupId, walletId, category })

  const [skip, setSkip] = useState(0)

  const visibleOperationIds = useMemo(() => {
    return operationIds.slice(skip, skip + TAKE)
  }, [operationIds, skip])

  const hasPrevOperations = useMemo(() => {
    return skip > 0
  }, [skip])

  const hasNextOperations = useMemo(() => {
    return skip + TAKE < operationIds.length
  }, [operationIds, skip])

  const getPrevOperations = useCallback(() => {
    setSkip((prevSkip) => prevSkip - TAKE)
  }, [])

  const getNextOperations = useCallback(() => {
    setSkip((prevSkip) => prevSkip + TAKE)
  }, [])

  useEffect(() => {
    setSkip(0)
  }, [category])

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

      {!!visibleOperationIds.length && (
        <>
          <Card.Divider />
          {visibleOperationIds.map((operationId) => (
            <Operation
              key={operationId}
              operationId={operationId}
              walletId={walletId}
            />
          ))}
        </>
      )}

      {hasPrevOperations || hasNextOperations ? (
        <>
          <Card.Divider />
          <Card.Pagination
            hasPrev={hasPrevOperations}
            hasNext={hasNextOperations}
            onPrevClick={getPrevOperations}
            onNextClick={getNextOperations}
          />
        </>
      ) : null}
    </Card>
  )
}
