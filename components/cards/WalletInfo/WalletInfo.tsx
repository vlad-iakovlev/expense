import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { Balance } from './WalletInfo.Balance.jsx'
import { BalanceInDefaultCurrency } from './WalletInfo.BalanceInDefaultCurrency.jsx'
import { Settings } from './WalletInfo.Settings.jsx'

interface Props {
  className?: string
  walletId: string
}

export const WalletInfoCard = ({ className, walletId }: Props) => (
  <Card className={className} aria-label="Wallet info">
    <Card.Title title="Info" actions={<Settings walletId={walletId} />} />
    <Card.Divider />
    <Balance walletId={walletId} />
    <BalanceInDefaultCurrency walletId={walletId} />
  </Card>
)
