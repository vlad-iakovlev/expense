import { Card } from '@/components/common/Card/index.jsx'
import { Balance } from './Balance.jsx'
import { BalanceInDefaultCurrency } from './BalanceInDefaultCurrency.jsx'
import { Settings } from './Settings.jsx'

interface WalletInfoCardProps {
  className?: string
  walletId: string
}

export const WalletInfoCard = ({
  className,
  walletId,
}: WalletInfoCardProps) => (
  <Card className={className} aria-label="Wallet info">
    <Card.Title title="Info" actions={<Settings walletId={walletId} />} />
    <Card.Divider />
    <Balance walletId={walletId} />
    <BalanceInDefaultCurrency walletId={walletId} />
  </Card>
)
