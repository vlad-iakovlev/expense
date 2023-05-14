import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useGroupedOperations } from '../../../stores/RootStore/hooks/useGroupedOperations.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Add } from './OperationsList.Add.tsx'
import { CategoryFilter } from './OperationsList.CategoryFilter.tsx'
import { Group } from './OperationsList.Group.tsx'

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
  const { groupedOperations } = useGroupedOperations({
    groupId,
    walletId,
    category,
  })

  const [take, setTake] = useState(PAGE_SIZE)
  useEffect(() => setTake(PAGE_SIZE), [category])

  const renderedOperations = useMemo(() => {
    if (!groupedOperations.length) return []

    let left = take

    return groupedOperations.reduce<ReactNode[]>(
      (acc, { date, operationIds }) => {
        if (left <= 0) return acc
        operationIds = operationIds.slice(0, left)
        left -= operationIds.length

        return [
          ...acc,
          <Group
            key={Number(date)}
            date={date}
            operationIds={operationIds}
            walletId={walletId}
          />,
        ]
      },
      [<Card.Divider key="divider" />]
    )
  }, [groupedOperations, take, walletId])

  const canShowMore = useMemo(() => {
    const operationsCount = groupedOperations.reduce(
      (acc, { operationIds }) => {
        return acc + operationIds.length
      },
      0
    )

    return take < operationsCount
  }, [groupedOperations, take])

  const handleShowMore = useCallback(() => {
    setTake((prevTake) => prevTake + PAGE_SIZE)
  }, [])

  if (!walletId && !category && !groupedOperations.length) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title title="Operations" actions={<Add walletId={walletId} />} />

      {(!!category || !!groupedOperations.length) && (
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
