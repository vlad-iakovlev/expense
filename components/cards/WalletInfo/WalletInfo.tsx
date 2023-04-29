import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { WalletInfoBalance } from './WalletInfoBalance.tsx'
import { WalletInfoBalanceInDefaultCurrency } from './WalletInfoBalanceInDefaultCurrency.tsx'
import { WalletInfoCurrency } from './WalletInfoCurrency.tsx'
import { WalletInfoDelete } from './WalletInfoDelete.tsx'
import { WalletInfoName } from './WalletInfoName.tsx'

interface Props {
  className?: string
  walletId: string
}

export const WalletInfoCard: FC<Props> = ({ className, walletId }) => {
  return (
    <Card className={className}>
      <Card.Title
        title="Info"
        action={<WalletInfoDelete walletId={walletId} />}
      />
      <Card.Divider />
      <WalletInfoName walletId={walletId} />
      <WalletInfoCurrency walletId={walletId} />
      <WalletInfoBalance walletId={walletId} />
      <WalletInfoBalanceInDefaultCurrency walletId={walletId} />
    </Card>
  )
}
