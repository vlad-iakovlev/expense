import { FC } from 'react'
import { formatAmount } from '../../../utils/formatAmount'
import { useWalletContext } from '../../contexts/Wallet'
import { Card } from '../../ui-kit/Card'

export const WalletInfoBalance: FC = () => {
  const { wallet } = useWalletContext()

  return (
    <Card.Button
      disabled
      end={
        <div className="font-medium">
          {formatAmount(wallet.balance, wallet.currency)}
        </div>
      }
    >
      Balance
    </Card.Button>
  )
}
