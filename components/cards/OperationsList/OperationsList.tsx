import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.jsx'
import { useGroupedOperations } from '../../../contexts/RootStore/hooks/useGroupedOperations.js'
import { Card } from '../../ui-kit/Card/Card.jsx'
import { Add } from './OperationsList.Add.jsx'
import { CategoryFilter } from './OperationsList.CategoryFilter.jsx'
import { Group } from './OperationsList.Group.jsx'

interface Props {
  className?: string
  groupId?: string
  walletId?: string
}

const PAGE_SIZE = 10

export const OperationsListCard = ({ className, groupId, walletId }: Props) => {
  const { categoryFilter } = useCategoryFilter()
  const { groupedOperations } = useGroupedOperations({
    groupId,
    walletId,
    category: categoryFilter,
  })

  const [take, setTake] = useState(PAGE_SIZE)
  useEffect(() => setTake(PAGE_SIZE), [categoryFilter])

  const renderedOperations = useMemo(() => {
    if (!groupedOperations.length) return []

    let left = take

    return groupedOperations.reduce<React.ReactNode[]>(
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
      [<Card.Divider key="divider" />],
    )
  }, [groupedOperations, take, walletId])

  const canShowMore = useMemo(() => {
    const operationsCount = groupedOperations.reduce(
      (acc, { operationIds }) => acc + operationIds.length,
      0,
    )

    return take < operationsCount
  }, [groupedOperations, take])

  const handleShowMore = useCallback(() => {
    setTake((prevTake) => prevTake + PAGE_SIZE)
  }, [])

  if (!walletId && !categoryFilter && !groupedOperations.length) {
    return null
  }

  return (
    <Card className={className} aria-label="Operations">
      <Card.Title title="Operations" actions={<Add walletId={walletId} />} />

      <CategoryFilter groupId={groupId} walletId={walletId} />

      {renderedOperations}

      {canShowMore ? (
        <>
          <Card.Divider />
          <Card.Item
            prefix={<EllipsisHorizontalIcon className="h-6 w-6" />}
            label="Show more"
            onClick={handleShowMore}
          />
        </>
      ) : null}
    </Card>
  )
}
