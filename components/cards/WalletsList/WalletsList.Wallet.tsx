import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ArrowsUpDownIcon } from '@heroicons/react/20/solid'
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
        label={`${wallet.name} ${wallet.currency.name}`}
        value={
          <div
            className={clsx(
              'flex items-center justify-center w-8 h-8 -mx-2 touch-none',
              {
                'cursor-grab': !isDragging,
                'cursor-grabbing': isDragging,
              }
            )}
            {...attributes}
            {...listeners}
          >
            <ArrowsUpDownIcon className="w-4 h-4" />
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
