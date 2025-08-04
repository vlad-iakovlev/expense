import { Card } from '@/components/common/Card/index'
import { Balance } from './Balance'
import { BalanceInDefaultCurrency } from './BalanceInDefaultCurrency'
import { Settings } from './Settings'

type WalletInfoCardProps = {
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
