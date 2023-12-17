import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { twMerge } from 'tailwind-merge'
import { ROUTES } from '../../../constants/routes.js'
import { useWallet } from '../../../contexts/RootStore/hooks/useWallet.js'
import { useWalletBalance } from '../../../contexts/RootStore/hooks/useWalletBalance.js'
import { Amount } from '../../ui-kit/Amount/Amount.jsx'
import { Card } from '../../ui-kit/Card/Card.jsx'
import { DndIcon } from '../../ui-kit/DndIcon/DndIcon.jsx'

interface Props {
  canReorderWallets: boolean
  isReordering: boolean
  walletId: string
}

export const Wallet = ({
  canReorderWallets,
  isReordering,
  walletId,
}: Props) => {
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
    <Card.Link
      href={ROUTES.WALLET(wallet.id)}
      label={wallet.name}
      value={
        <Amount
          className="font-medium"
          amount={walletBalance.balance}
          currency={walletBalance.currency}
          showSign="negative"
        />
      }
    />
  )
}
