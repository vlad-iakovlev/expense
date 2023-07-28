import { Card } from '../../ui-kit/Card/Card.tsx'
import { Balance } from './WalletInfo.Balance.tsx'
import { BalanceInDefaultCurrency } from './WalletInfo.BalanceInDefaultCurrency.tsx'
import { Settings } from './WalletInfo.Settings.tsx'

interface Props {
  className?: string
  walletId: string
}

export const WalletInfoCard = ({ className, walletId }: Props) => {
  return (
    <Card className={className} aria-label="Wallet info">
      <Card.Title title="Info" actions={<Settings walletId={walletId} />} />
      <Card.Divider />
      <Balance walletId={walletId} />
      <BalanceInDefaultCurrency walletId={walletId} />
    </Card>
  )
}
