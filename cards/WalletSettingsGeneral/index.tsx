import { Card } from '@/components/common/Card/index'
import { Currency } from './Currency'
import { Delete } from './Delete'
import { Name } from './Name'

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
