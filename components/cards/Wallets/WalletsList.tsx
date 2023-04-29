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
import { WalletsItem } from './WalletsItem.tsx'

interface Props {
  walletIds: string[]
  groupId: string | undefined
}

export const WalletsList: FC<Props> = ({ walletIds, groupId }) => {
  const { reorderWallets } = useWallets({ groupId })

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const canDrag = !!groupId && walletIds.length > 1

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={walletIds} strategy={verticalListSortingStrategy}>
        {walletIds.map((walletId) => (
          <WalletsItem key={walletId} canDrag={canDrag} walletId={walletId} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
