import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ArrowsUpDownIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { useRouter } from 'next/router.js'
import {
  CSSProperties,
  FC,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { useWalletBalance } from '../../../stores/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  canDrag: boolean
  walletId: string
}

export const WalletsItem: FC<Props> = ({ canDrag, walletId }) => {
  const router = useRouter()
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

  const dragHandleRef = useRef<HTMLDivElement>(null)

  const style = useMemo<CSSProperties>(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition]
  )

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!dragHandleRef.current?.contains(event.target as Node)) {
        void router.push(ROUTES.WALLET(wallet.id))
      }
    },
    [router, wallet.id]
  )

  return (
    <div
      ref={setNodeRef}
      className={clsx('relative transition-shadow', {
        'shadow-none': !isDragging,
        'z-10 shadow-lg': isDragging,
      })}
      style={style}
    >
      <Card.Button
        key={wallet.id}
        active={isDragging}
        start={
          canDrag ? (
            <div
              ref={dragHandleRef}
              className={clsx(
                'flex items-center justify-center w-8 h-8 -mx-2 touch-manipulation',
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
          ) : null
        }
        end={
          <Amount
            className="font-medium"
            amount={walletBalance.balance}
            currency={walletBalance.currency}
          />
        }
        onClick={handleClick}
      >
        {wallet.name}
      </Card.Button>
    </div>
  )
}
