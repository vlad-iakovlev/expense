import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Card } from '@/components/common/Card/index'
import { useCategoryFilter } from '@/contexts/CategoryFilter'
import { useGroupedOperations } from '@/contexts/RootStore/hooks/useGroupedOperations'
import { Add } from './Add'
import { CategoryFilter } from './CategoryFilter'
import { Group } from './Group'

interface OperationsListCardProps {
  className?: string
  groupId?: string
  walletId?: string
}

const PAGE_SIZE = 10

export const OperationsListCard = ({
  className,
  groupId,
  walletId,
}: OperationsListCardProps) => {
  const { categoryFilter } = useCategoryFilter()
  const { groupedOperations } = useGroupedOperations({
    groupId,
    walletId,
    category: categoryFilter,
  })

  const [take, setTake] = React.useState(PAGE_SIZE)
  React.useEffect(() => setTake(PAGE_SIZE), [categoryFilter])

  const renderedOperations = React.useMemo(() => {
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

  const canShowMore = React.useMemo(() => {
    const operationsCount = groupedOperations.reduce(
      (acc, { operationIds }) => acc + operationIds.length,
      0,
    )

    return take < operationsCount
  }, [groupedOperations, take])

  const handleShowMore = React.useCallback(() => {
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
