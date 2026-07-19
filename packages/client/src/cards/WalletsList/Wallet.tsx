import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Link } from '@tanstack/react-router'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Amount } from '@/components/Amount'
import { Card } from '@/components/Card'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'
import { useWalletBalance } from '@/contexts/RootStore/hooks/useWalletBalance'
import { DndIcon } from '@/icons/DndIcon'
import { Route as WalletRoute } from '@/routes/wallet.$walletId.index'

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
  const { wallet, setWalletHidden } = useWallet({ walletId })
  const { walletBalance } = useWalletBalance({ walletId })

  const handleToggleHidden = useCallback(() => {
    setWalletHidden(!wallet.hidden)
  }, [setWalletHidden, wallet.hidden])

  if (isReordering) {
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
        prefix={
          <button
            className="-m-3 flex h-12 w-12 flex-none touch-none items-center justify-center text-zinc-400 dark:text-zinc-600"
            aria-label={wallet.hidden ? 'Show wallet' : 'Hide wallet'}
            title={wallet.hidden ? 'Show wallet' : 'Hide wallet'}
            onClick={handleToggleHidden}
          >
            {wallet.hidden ? (
              <EyeSlashIcon className="size-6" />
            ) : (
              <EyeIcon className="size-6" />
            )}
          </button>
        }
        suffix={
          canReorderWallets && (
            <div
              className={twMerge(
                '-m-3 flex h-12 w-12 flex-none touch-none items-center justify-center text-zinc-400 dark:text-zinc-600',
                isDragging ? 'cursor-grabbing' : 'cursor-grab',
              )}
              {...attributes}
              {...listeners}
            >
              <DndIcon className="size-6" />
            </div>
          )
        }
      />
    )
  }

  if (wallet.hidden) {
    return null
  }

  return (
    <Link to={WalletRoute.to} params={{ walletId }}>
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
