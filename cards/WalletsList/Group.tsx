import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from '@/components/common/Card/index.jsx'
import { DndIcon } from '@/components/icons/DndIcon.jsx'
import { ClientCurrency } from '@/types/client.js'
import { Wallet } from './Wallet.jsx'

interface Props {
  canReorderGroups: boolean
  isReordering: boolean
  currency: ClientCurrency
  walletIds: string[]
  onReorder: (currencyId: string, walletIds: string[]) => void
}

export const Group = ({
  canReorderGroups,
  isReordering,
  currency,
  walletIds,
  onReorder,
}: Props) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: currency.id })

  const canReorderWallets = walletIds.length > 1

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const oldIndex = walletIds.indexOf(String(event.active.id))
      const newIndex = walletIds.indexOf(String(event.over?.id))
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

      const newWalletIds = arrayMove(walletIds, oldIndex, newIndex)
      onReorder(currency.id, newWalletIds)
    },
    [currency.id, onReorder, walletIds],
  )

  return (
    <div
      ref={setNodeRef}
      className={twMerge(
        'bg-secondary relative transition-shadow',
        isDragging ? 'z-10 shadow-dnd' : 'shadow-none',
      )}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      role="listitem"
    >
      <div role="list" aria-label={currency.name ?? currency.symbol}>
        <Card.Subtitle
          subtitle={currency.symbol}
          actions={
            canReorderGroups &&
            isReordering && (
              <div
                className={twMerge(
                  '-m-3 flex h-12 w-12 flex-none touch-none items-center justify-center',
                  isDragging ? 'cursor-grabbing' : 'cursor-grab',
                )}
                {...attributes}
                {...listeners}
              >
                <DndIcon className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
              </div>
            )
          }
        />

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
                canReorderWallets={canReorderWallets}
                isReordering={isReordering}
                walletId={walletId}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
