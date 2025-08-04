import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { Amount } from '@/components/common/Amount'
import { Card } from '@/components/common/Card/index'
import { DndIcon } from '@/components/icons/DndIcon'
import { ROUTES } from '@/constants/routes'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'
import { useWalletBalance } from '@/contexts/RootStore/hooks/useWalletBalance'

type WalletProps = {
  canReorderWallets: boolean
  isReordering: boolean
  walletId: string
}

export const Wallet = ({
  canReorderWallets,
  isReordering,
  walletId,
}: WalletProps) => {
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: walletId })
  const { wallet } = useWallet({ walletId })
  const { walletBalance } = useWalletBalance({ walletId })

  if (canReorderWallets && isReordering) {
    return (
      <Card.Item
        ref={setNodeRef}
        className={twMerge(
          'relative transition-shadow',
          isDragging ? 'z-10 shadow-dnd' : 'shadow-none',
        )}
        style={{
          transform: CSS.Translate.toString(transform),
          transition,
        }}
        label={wallet.name}
        suffix={
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
        }
      />
    )
  }

  if (isReordering) {
    return <Card.Item label={wallet.name} />
  }

  return (
    <Link href={ROUTES.WALLET(wallet.id)}>
      <Card.Item
        label={wallet.name}
        value={
          <Amount
            className="font-medium"
            amount={walletBalance.balance}
            currency={walletBalance.currency}
            showSign="negative"
          />
        }
        clickable
        tabIndex={-1}
      />
    </Link>
  )
}
