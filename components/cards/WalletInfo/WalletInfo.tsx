import { Card } from '../../ui-kit/Card/Card.tsx'
import { Balance } from './WalletInfo.Balance.tsx'
import { BalanceInDefaultCurrency } from './WalletInfo.BalanceInDefaultCurrency.tsx'

interface Props {
  className?: string
  walletId: string
}

export const WalletInfoCard = ({ className, walletId }: Props) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" />
      <Card.Divider />
      <Balance walletId={walletId} />
      <BalanceInDefaultCurrency walletId={walletId} />
    </Card>
  )
}
