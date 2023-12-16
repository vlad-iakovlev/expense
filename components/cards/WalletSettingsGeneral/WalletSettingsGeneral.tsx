import { Card } from '../../ui-kit/Card/Card.jsx'
import { Currency } from './WalletSettingsGeneral.Currency.jsx'
import { Delete } from './WalletSettingsGeneral.Delete.jsx'
import { Name } from './WalletSettingsGeneral.Name.jsx'

interface Props {
  className?: string
  walletId: string
}

export const WalletSettingsGeneralCard = ({ className, walletId }: Props) => {
  return (
    <Card className={className} aria-label="General wallet settings">
      <Card.Title title="General" actions={<Delete walletId={walletId} />} />
      <Card.Divider />
      <Name walletId={walletId} />
      <Currency walletId={walletId} />
    </Card>
  )
}
