import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import { FC } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { useWalletBalance } from '../../../stores/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { CurrencyBadge } from '../../ui-kit/CurrencyBadge/CurrencyBadge.tsx'

interface Props {
  isReordering: boolean
  walletId: string
}

export const Wallet: FC<Props> = ({ isReordering, walletId }) => {
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

  if (isReordering) {
    return (
      <Card.Text
        ref={setNodeRef}
        key={wallet.id}
        className={clsx('relative transition-shadow', {
          'shadow-none': !isDragging,
          'z-10 shadow-dnd': isDragging,
        })}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        label={wallet.name}
        value={
          <div className="flex items-center gap-3 sm:gap-4">
            <CurrencyBadge currency={wallet.currency} />
            <div
              className={clsx(
                'flex-none flex flex-col items-center justify-center h-12 w-12 -m-3 gap-[3px] touch-none',
                {
                  'cursor-grab': !isDragging,
                  'cursor-grabbing': isDragging,
                }
              )}
              {...attributes}
              {...listeners}
            >
              <div className="w-5 h-[2px] bg-zinc-400 rounded-full" />
              <div className="w-5 h-[2px] bg-zinc-400 rounded-full" />
              <div className="w-5 h-[2px] bg-zinc-400 rounded-full" />
            </div>
          </div>
        }
      />
    )
  }

  return (
    <Card.Link
      key={wallet.id}
      href={ROUTES.WALLET(wallet.id)}
      label={wallet.name}
      value={
        <Amount
          className="font-medium"
          amount={walletBalance.balance}
          currency={walletBalance.currency}
        />
      }
    />
  )
}
