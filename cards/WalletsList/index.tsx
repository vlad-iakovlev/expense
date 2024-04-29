import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/common/Button.jsx'
import { Card } from '@/components/common/Card/index.jsx'
import { useGroupedWallets } from '@/contexts/RootStore/hooks/useGroupedWallets.js'
import { Add } from './Add.jsx'
import { Group } from './Group.jsx'

interface Props {
  className?: string
  groupId: string
}

export const WalletsListCard = ({ className, groupId }: Props) => {
  const { groupedWallets, reorderWallets } = useGroupedWallets({ groupId })

  const currencyIds = useMemo(
    () => groupedWallets.map(({ currency }) => currency.id),
    [groupedWallets],
  )

  const canReorderGroups = groupedWallets.length > 1
  const canReorderWallets = useMemo(
    () => groupedWallets.some(({ walletIds }) => walletIds.length > 1),
    [groupedWallets],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const oldIndex = currencyIds.indexOf(String(event.active.id))
      const newIndex = currencyIds.indexOf(String(event.over?.id))
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

      const newGroupedWallets = arrayMove(groupedWallets, oldIndex, newIndex)
      reorderWallets(newGroupedWallets)
    },
    [currencyIds, groupedWallets, reorderWallets],
  )

  const handleReorder = useCallback(
    (currencyId: string, walletIds: string[]) => {
      const newGroupedWallets = groupedWallets.map((groupedWalletIds) => {
        if (groupedWalletIds.currency.id === currencyId) {
          return { ...groupedWalletIds, walletIds }
        }
        return groupedWalletIds
      })

      reorderWallets(newGroupedWallets)
    },
    [groupedWallets, reorderWallets],
  )

  const [isReordering, setIsReordering] = useState(false)
  const startReordering = useCallback(() => setIsReordering(true), [])
  const stopReordering = useCallback(() => setIsReordering(false), [])

  return (
    <Card className={className} aria-label="Wallets">
      <Card.Title
        title="Wallets"
        actions={
          isReordering ? (
            <Button rounded size="sm" theme="green" onClick={stopReordering}>
              Done
            </Button>
          ) : (
            <>
              <Add groupId={groupId} />
              {(canReorderGroups || canReorderWallets) && (
                <Button
                  rounded
                  size="sm"
                  theme="white"
                  onClick={startReordering}
                >
                  Edit
                </Button>
              )}
            </>
          )
        }
      />

      {groupedWallets.length > 0 && (
        <>
          <Card.Divider />

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currencyIds}
              strategy={verticalListSortingStrategy}
            >
              {groupedWallets.map(({ currency, walletIds }) => (
                <Group
                  key={currency.id}
                  canReorderGroups={canReorderGroups}
                  isReordering={isReordering}
                  currency={currency}
                  walletIds={walletIds}
                  onReorder={handleReorder}
                />
              ))}
            </SortableContext>
          </DndContext>
        </>
      )}
    </Card>
  )
}
