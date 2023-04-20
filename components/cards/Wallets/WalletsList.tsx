import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import assert from 'assert'
import { FC, useCallback, useEffect, useState } from 'react'
import { setWalletsOrder } from '../../../api/client/wallets.ts'
import { ClientWallet } from '../../../api/types/wallets.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useWalletsContext } from '../../contexts/Wallets.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { WalletsItem } from './WalletsItem.tsx'

export const WalletsList: FC = () => {
  const sensors = useSensors(useSensor(PointerSensor))
  const { setLoading } = useLoadingContext()
  const { walletsResponse, walletsPayload, mutateWallets } = useWalletsContext()
  const [wallets, setWallets] = useState<ClientWallet[]>([])

  const canDrag = !!walletsPayload.groupId && wallets.length > 1

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      void (async () => {
        assert(walletsPayload.groupId, 'groupId is not defined')

        const oldIndex = wallets.findIndex(
          (wallet) => wallet.id === event.active.id
        )
        const newIndex = wallets.findIndex(
          (wallet) => wallet.id === event.over?.id
        )
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return

        const newWallets = arrayMove(wallets, oldIndex, newIndex)
        setWallets(newWallets)

        try {
          setLoading(true)

          await setWalletsOrder({
            groupId: walletsPayload.groupId,
            walletIds: newWallets.map((wallet) => wallet.id),
          })

          await mutateWallets()
        } finally {
          setLoading(false)
        }
      })()
    },
    [mutateWallets, setLoading, wallets, walletsPayload.groupId]
  )

  useEffect(() => {
    setWallets(walletsResponse?.wallets ?? [])
  }, [walletsResponse?.wallets])

  if (!walletsResponse) {
    return (
      <>
        <Card.Divider />
        <Card.Skeleton />
        <Card.Skeleton />
        <Card.Skeleton />
        <Card.Skeleton />
        <Card.Skeleton />
        <Card.Skeleton />
      </>
    )
  }

  return (
    <>
      {wallets.length > 0 && <Card.Divider />}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={wallets} strategy={verticalListSortingStrategy}>
          {wallets.map((wallet) => (
            <WalletsItem key={wallet.id} canDrag={canDrag} wallet={wallet} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  )
}
