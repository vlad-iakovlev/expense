import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from '@/components/common/Card/index'
import { DndIcon } from '@/components/icons/DndIcon'
import { PopulatedClientCurrency } from '@/types/client'
import { Wallet } from './Wallet'

interface GroupProps {
  canReorderGroups: boolean
  isReordering: boolean
  currency: PopulatedClientCurrency
  walletIds: string[]
  onReorder: (currencyId: string, walletIds: string[]) => void
}

export const Group = ({
  canReorderGroups,
  isReordering,
  currency,
  walletIds,
  onReorder,
}: GroupProps) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: currency.id })

  const canReorderWallets = walletIds.length > 1

  const handleDragEnd = React.useCallback(
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
        'relative bg-secondary-background transition-shadow',
        isDragging ? 'z-10 shadow-dnd' : 'shadow-none',
      )}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      role="listitem"
    >
      <div role="list" aria-label={currency.name}>
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
