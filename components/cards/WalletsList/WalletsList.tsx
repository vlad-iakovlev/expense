import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { FC, useCallback, useState } from 'react'
import { useGroupedWallets } from '../../../stores/RootStore/hooks/useGroupedWallets.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Add } from './WalletsList.Add.tsx'
import { Group } from './WalletsList.Group.tsx'

interface Props {
  className?: string
  groupId: string
}

export const WalletsListCard: FC<Props> = ({ className, groupId }) => {
  const { groupedWallets, reorderWallets } = useGroupedWallets({ groupId })
  const currencyIds = groupedWallets.map(({ currency }) => currency.id)

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const oldIndex = currencyIds.indexOf(String(event.active.id))
      const newIndex = currencyIds.indexOf(String(event.over?.id))
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

      const newGroupedWallets = arrayMove(groupedWallets, oldIndex, newIndex)
      reorderWallets(newGroupedWallets)
    },
    [currencyIds, groupedWallets, reorderWallets]
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
    [groupedWallets, reorderWallets]
  )

  const [isReordering, setIsReordering] = useState(false)
  const startReordering = useCallback(() => setIsReordering(true), [])
  const stopReordering = useCallback(() => setIsReordering(false), [])

  return (
    <Card className={className}>
      <Card.Title
        title="Wallets"
        actions={
          isReordering ? (
            <Button rounded size="sm" onClick={stopReordering}>
              Done
            </Button>
          ) : (
            <>
              <Add groupId={groupId} />
              {groupedWallets.length > 1 && (
                <Button
                  rounded
                  size="sm"
                  theme="secondary"
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
