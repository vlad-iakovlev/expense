import { PlusIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { ClientWallet } from '../../models/wallet'
import { formatAmount } from '../../utils/formatAmount'
import { Card } from '../ui-kit/Card'

interface Props {
  wallets: ClientWallet[]
}

export const GroupWallets: FC<Props> = ({ wallets }) => {
  return (
    <Card>
      <Card.Title>Wallets</Card.Title>

      {wallets.map((wallet) => (
        <Card.Button
          key={wallet.id}
          end={
            <div className="font-medium">
              {formatAmount(wallet.balance, wallet.currency)}
            </div>
          }
        >
          {wallet.name}
        </Card.Button>
      ))}

      <Card.Button end={<PlusIcon className="w-5 h-5" />}>
        Create Wallet
      </Card.Button>
    </Card>
  )
}
