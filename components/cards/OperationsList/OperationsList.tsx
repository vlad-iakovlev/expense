import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useGroupedOperations } from '../../../stores/RootStore/hooks/useGroupedOperations.ts'
import { formatDate } from '../../../utils/formatDate.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Add } from './OperationsList.Add.tsx'
import { CategoryFilter } from './OperationsList.CategoryFilter.tsx'
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
  const { groupedOperationIds } = useGroupedOperations({
    groupId,
    walletId,
    category,
  })

  const [take, setTake] = useState(PAGE_SIZE)
  useEffect(() => setTake(PAGE_SIZE), [category])

  const renderedOperations = useMemo(() => {
    if (!groupedOperationIds.length) return []

    let left = take

    return groupedOperationIds.reduce<ReactNode[]>(
      (acc, { date, operationIds }) => {
        if (left <= 0) return acc
        operationIds = operationIds.slice(0, left)
        left -= operationIds.length

        return [
          ...acc,
          <Card.Subtitle key={date.toString()} subtitle={formatDate(date)} />,
          ...operationIds.map((operationId) => (
            <Operation
              key={operationId}
              operationId={operationId}
              walletId={walletId}
            />
          )),
        ]
      },
      [<Card.Divider key="divider" />]
    )
  }, [groupedOperationIds, take, walletId])

  const canShowMore = useMemo(() => {
    const operationsCount = groupedOperationIds.reduce(
      (acc, { operationIds }) => {
        return acc + operationIds.length
      },
      0
    )

    return take < operationsCount
  }, [groupedOperationIds, take])

  const handleShowMore = useCallback(() => {
    setTake((prevTake) => prevTake + PAGE_SIZE)
  }, [])

  if (!walletId && !category && !groupedOperationIds.length) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title title="Operations" actions={<Add walletId={walletId} />} />

      {(!!category || !!groupedOperationIds.length) && (
        <>
          <Card.Divider />
          <CategoryFilter category={category} setCategory={setCategory} />
        </>
      )}

      {renderedOperations}

      {canShowMore ? (
        <>
          <Card.Divider />
          <Card.Button
            prefix={<EllipsisHorizontalIcon className="w-6 h-6" />}
            label="Show more"
            onClick={handleShowMore}
          />
        </>
      ) : null}
    </Card>
  )
}
