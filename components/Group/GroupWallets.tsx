import { PlusIcon } from '@heroicons/react/24/solid'
import { FC } from 'react'
import { ClientWallet } from '../../models/wallet'
import { Avatar } from '../ui-kit/Avatar'
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
          start={<Avatar color={wallet.color} name={wallet.emoji} />}
        >
          {wallet.name}
        </Card.Button>
      ))}

      <Card.Button
        start={<Avatar color="green" slug={<PlusIcon className="w-6 h-6" />} />}
      >
        Create Wallet
      </Card.Button>
    </Card>
  )
}
