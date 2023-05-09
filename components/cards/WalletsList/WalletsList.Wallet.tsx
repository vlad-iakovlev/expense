import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Bars4Icon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import { FC } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { useWalletBalance } from '../../../stores/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

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
          <div className="flex items-center gap-1">
            <div className="flex-none flex items-center justify-center w-14 px-2 py-1 text-sm text-zinc-600 bg-zinc-100 rounded-md">
              {wallet.currency.name}
            </div>
            <div
              className={clsx(
                'flex-none flex items-center justify-center w-12 sm:w-14 h-12 pr-5 pl-1 sm:pl-3 py-3 -mr-6 -my-3 touch-none',
                {
                  'cursor-grab': !isDragging,
                  'cursor-grabbing': isDragging,
                }
              )}
              {...attributes}
              {...listeners}
            >
              <Bars4Icon className="text-zinc-400" />
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
