import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { twMerge } from 'tailwind-merge'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallet } from '../../../contexts/RootStore/hooks/useWallet.ts'
import { useWalletBalance } from '../../../contexts/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { DndIcon } from '../../ui-kit/DndIcon/DndIcon.tsx'

interface Props {
  canReorderWallets: boolean
  isReordering: boolean
  walletId: string
}

export const Wallet: React.FC<Props> = ({
  canReorderWallets,
  isReordering,
  walletId,
}) => {
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
      <Card.Text
        ref={setNodeRef}
        className={twMerge(
          'relative transition-shadow',
          isDragging ? 'z-10 shadow-dnd' : 'shadow-none'
        )}
        style={{
          transform: CSS.Translate.toString(transform),
          transition,
        }}
        label={wallet.name}
        suffix={
          <div
            className={twMerge(
              'flex-none flex items-center justify-center h-12 w-12 -m-3 touch-none',
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
            {...attributes}
            {...listeners}
          >
            <DndIcon className="w-6 h-6 text-zinc-400" />
          </div>
        }
      />
    )
  }

  if (isReordering) {
    return <Card.Text label={wallet.name} />
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
