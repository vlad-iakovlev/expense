import { Card } from '../../ui-kit/Card/Card.tsx'
import { Currency } from './WalletSettingsGeneral.Currency.tsx'
import { Delete } from './WalletSettingsGeneral.Delete.tsx'
import { Name } from './WalletSettingsGeneral.Name.tsx'

interface Props {
  className?: string
  walletId: string
}

export const WalletSettingsGeneralCard = ({ className, walletId }: Props) => {
  return (
    <Card className={className}>
      <Card.Title title="General" actions={<Delete walletId={walletId} />} />
      <Card.Divider />
      <Name walletId={walletId} />
      <Currency walletId={walletId} />
    </Card>
  )
}
