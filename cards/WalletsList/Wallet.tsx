import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { twMerge } from 'tailwind-merge'
import { Amount } from '@/components/common/Amount.jsx'
import { Card } from '@/components/common/Card/index.jsx'
import { DndIcon } from '@/components/icons/DndIcon.jsx'
import { NextLink } from '@/components/next/Link.js'
import { ROUTES } from '@/constants/routes.js'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'
import { useWalletBalance } from '@/contexts/RootStore/hooks/useWalletBalance.js'

interface WalletProps {
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
    <NextLink
      href={`${ROUTES.WALLET(wallet.id)}?animation=forward`}
      as={ROUTES.WALLET(wallet.id)}
    >
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
    </NextLink>
  )
}
