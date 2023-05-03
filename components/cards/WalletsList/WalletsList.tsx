import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { FC, useCallback } from 'react'
import { useWallets } from '../../../stores/RootStore/hooks/useWallets.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Create } from './WalletsList.Create.tsx'
import { Wallet } from './WalletsList.Wallet.tsx'

interface Props {
  className?: string
  groupId: string
}

export const WalletsListCard: FC<Props> = ({ className, groupId }) => {
  const { walletIds, reorderWallets } = useWallets({ groupId })

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const canDrag = walletIds.length > 1

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

  return (
    <Card className={className}>
      <Card.Title title="Wallets" action={<Create groupId={groupId} />} />

      {walletIds.length > 0 && (
        <>
          <Card.Divider />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={walletIds}
              strategy={verticalListSortingStrategy}
            >
              {walletIds.map((walletId) => (
                <Wallet key={walletId} canDrag={canDrag} walletId={walletId} />
              ))}
            </SortableContext>
          </DndContext>
        </>
      )}
    </Card>
  )
}
