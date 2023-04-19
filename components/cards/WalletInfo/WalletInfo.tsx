import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { WalletInfoBalance } from './WalletInfoBalance.tsx'
import { WalletInfoBalanceInDefaultCurrency } from './WalletInfoBalanceInDefaultCurrency.tsx'
import { WalletInfoCurrency } from './WalletInfoCurrency.tsx'
import { WalletInfoDelete } from './WalletInfoDelete.tsx'
import { WalletInfoName } from './WalletInfoName.tsx'

interface Props {
  className?: string
}

export const WalletInfoCard: FC<Props> = ({ className }) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" action={<WalletInfoDelete />} />
      <Card.Divider />
      <WalletInfoName />
      <WalletInfoCurrency />
      <WalletInfoBalance />
      <WalletInfoBalanceInDefaultCurrency />
    </Card>
  )
}
