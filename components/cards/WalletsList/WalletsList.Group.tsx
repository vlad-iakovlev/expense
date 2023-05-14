import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import { FC, useCallback } from 'react'
import { ClientCurrency } from '../../../types/client.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { DndIcon } from '../../ui-kit/DndIcon/DndIcon.tsx'
import { Wallet } from './WalletsList.Wallet.tsx'

interface Props {
  isReordering: boolean
  currency: ClientCurrency
  walletIds: string[]
  onReorder: (currencyId: string, walletIds: string[]) => void
}

export const Group: FC<Props> = ({
  isReordering,
  currency,
  walletIds,
  onReorder,
}) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: currency.id })

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const oldIndex = walletIds.indexOf(String(event.active.id))
      const newIndex = walletIds.indexOf(String(event.over?.id))
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

      const newWalletIds = arrayMove(walletIds, oldIndex, newIndex)
      onReorder(currency.id, newWalletIds)
    },
    [currency.id, onReorder, walletIds]
  )

  const wallets = (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={walletIds} strategy={verticalListSortingStrategy}>
        {walletIds.map((walletId) => (
          <Wallet
            key={walletId}
            isReordering={isReordering}
            walletId={walletId}
          />
        ))}
      </SortableContext>
    </DndContext>
  )

  if (isReordering) {
    return (
      <div
        ref={setNodeRef}
        className={clsx('relative transition-shadow bg-white', {
          'shadow-none': !isDragging,
          'z-10 shadow-dnd': isDragging,
        })}
        style={{
          transform: CSS.Translate.toString(transform),
          transition,
        }}
      >
        <Card.Subtitle
          subtitle={currency.symbol}
          actions={
            <div
              className={clsx(
                'flex-none flex items-center justify-center h-12 w-12 -m-3 touch-none',
                { 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }
              )}
              {...attributes}
              {...listeners}
            >
              <DndIcon className="w-6 h-6 text-zinc-400" />
            </div>
          }
        />
        {wallets}
      </div>
    )
  }

  return (
    <div className="bg-white">
      <Card.Subtitle subtitle={currency.symbol} />
      {wallets}
    </div>
  )
}
