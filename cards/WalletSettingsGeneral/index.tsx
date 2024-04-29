import { Card } from '@/components/common/Card/index.jsx'
import { Currency } from './Currency.jsx'
import { Delete } from './Delete.jsx'
import { Name } from './Name.jsx'

interface WalletSettingsGeneralCardProps {
  className?: string
  walletId: string
}

export const WalletSettingsGeneralCard = ({
  className,
  walletId,
}: WalletSettingsGeneralCardProps) => (
  <Card className={className} aria-label="General wallet settings">
    <Card.Title title="General" actions={<Delete walletId={walletId} />} />
    <Card.Divider />
    <Name walletId={walletId} />
    <Currency walletId={walletId} />
  </Card>
)
