import clsx from 'clsx'
import { format } from 'date-fns'
import { FC } from 'react'
import { ClientOperation } from '../../../api/types/operations'
import { formatAmount } from '../../../utils/formatAmount'

interface Props {
  className?: string
  operation: ClientOperation
  walletType: 'column' | 'button'
}

export const OperationsItem: FC<Props> = ({
  className,
  operation,
  walletType,
}) => {
  return (
    <div
      className={clsx(
        className,
        'flex items-center min-h-12 px-4 sm:px-6 py-2 gap-4'
      )}
    >
      <div
        className={clsx('flex-auto min-w-0 sm:grid sm:gap-4', {
          'sm:grid-cols-5': walletType === 'column',
          'sm:grid-cols-4': walletType === 'button',
        })}
      >
        <div className="truncate">
          {format(new Date(operation.date), 'dd.MM HH:mm')}
        </div>
        <div className="truncate">{operation.category}</div>
        <div className="truncate">{operation.description}</div>
        <div className="truncate">
          {formatAmount(operation.amount, operation.wallet.currency)}
        </div>
        {walletType === 'column' && (
          <div className="truncate">{operation.wallet.name}</div>
        )}
      </div>
    </div>
  )
}
