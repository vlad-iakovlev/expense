import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { FC, useCallback, useState } from 'react'
import { useWallets } from '../../../stores/RootStore/hooks/useWallets.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Add } from './WalletsList.Add.tsx'
import { Wallet } from './WalletsList.Wallet.tsx'

interface Props {
  className?: string
  groupId: string
}

export const WalletsListCard: FC<Props> = ({ className, groupId }) => {
  const { walletIds, reorderWallets } = useWallets({ groupId })

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const oldIndex = walletIds.indexOf(String(event.active.id))
      const newIndex = walletIds.indexOf(String(event.over?.id))
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

      const newWalletIds = arrayMove(walletIds, oldIndex, newIndex)
      reorderWallets(newWalletIds)
    },
    [reorderWallets, walletIds]
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
              {walletIds.length > 1 && (
                <Button rounded size="sm" onClick={startReordering}>
                  Edit
                </Button>
              )}
            </>
          )
        }
      />

      {walletIds.length > 0 && (
        <>
          <Card.Divider />
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={walletIds}
              strategy={verticalListSortingStrategy}
            >
              {walletIds.map((walletId) => (
                <Wallet
                  key={walletId}
                  isReordering={isReordering}
                  walletId={walletId}
                />
              ))}
            </SortableContext>
          </DndContext>
        </>
      )}
    </Card>
  )
}
