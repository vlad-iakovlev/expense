import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { WalletInfoBalance } from './WalletInfoBalance'
import { WalletInfoCurrency } from './WalletInfoCurrency'

export const WalletInfoCard: FC = () => (
  <Card>
    <Card.Title title="Info" />
    <Card.Divider />
    <WalletInfoBalance />
    <WalletInfoCurrency />
  </Card>
)
