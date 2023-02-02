import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { WalletSettingsCurrency } from './WalletSettingsCurrency'

export const WalletSettingsCard: FC = () => (
  <Card>
    <Card.Title title="Settings" />
    <Card.Divider />
    <WalletSettingsCurrency />
  </Card>
)
