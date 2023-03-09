import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { WalletInfoBalance } from './WalletInfoBalance'
import { WalletInfoBalanceInDefaultCurrency } from './WalletInfoBalanceInDefaultCurrency'
import { WalletInfoCurrency } from './WalletInfoCurrency'
import { WalletInfoDelete } from './WalletInfoDelete'
import { WalletInfoName } from './WalletInfoName'

export const WalletInfoCard: FC = () => {
  return (
    <Card>
      <Card.Title title="Info" action={<WalletInfoDelete />} />
      <Card.Divider />
      <WalletInfoName />
      <WalletInfoCurrency />
      <WalletInfoBalance />
      <WalletInfoBalanceInDefaultCurrency />
    </Card>
  )
}
