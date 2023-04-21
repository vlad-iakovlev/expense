import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ArrowsUpDownIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { useRouter } from 'next/router.js'
import { CSSProperties, FC, useCallback, useMemo } from 'react'
import { ClientWallet } from '../../../api/types/wallets.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  canDrag: boolean
  wallet: ClientWallet
}

export const WalletsItem: FC<Props> = ({ canDrag, wallet }) => {
  const router = useRouter()
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: wallet.id })

  const style = useMemo<CSSProperties>(
    () => ({
      position: 'relative',
      zIndex: isDragging ? 1 : 0,
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [isDragging, transform, transition]
  )

  const handleClick = useCallback(() => {
    void router.push(ROUTES.WALLET(wallet.id))
  }, [router, wallet.id])

  return (
    <div
      ref={setNodeRef}
      className={clsx('transition-shadow', {
        'shadow-none': !isDragging,
        'shadow-lg': isDragging,
      })}
      style={style}
    >
      <Card.Button
        key={wallet.id}
        active={isDragging}
        start={
          canDrag ? (
            <div
              className="flex items-center justify-center w-8 h-8 -mx-2 touch-manipulation"
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
            amount={wallet.balance}
            currency={wallet.currency}
          />
        }
        onClick={handleClick}
      >
        {wallet.name}
      </Card.Button>
    </div>
  )
}
