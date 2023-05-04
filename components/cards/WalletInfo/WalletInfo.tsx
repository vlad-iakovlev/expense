import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Balance } from './WalletInfo.Balance.tsx'
import { BalanceInDefaultCurrency } from './WalletInfo.BalanceInDefaultCurrency.tsx'
import { Currency } from './WalletInfo.Currency.tsx'
import { Delete } from './WalletInfo.Delete.tsx'
import { Name } from './WalletInfo.Name.tsx'

interface Props {
  className?: string
  walletId: string
}

export const WalletInfoCard: FC<Props> = ({ className, walletId }) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" actions={<Delete walletId={walletId} />} />
      <Card.Divider />
      <Name walletId={walletId} />
      <Currency walletId={walletId} />
      <Balance walletId={walletId} />
      <BalanceInDefaultCurrency walletId={walletId} />
    </Card>
  )
}
