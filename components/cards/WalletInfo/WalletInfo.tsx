import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { WalletInfoBalance } from './WalletInfoBalance'
import { WalletInfoBalanceInDefaultCurrency } from './WalletInfoBalanceInDefaultCurrency'
import { WalletInfoCurrency } from './WalletInfoCurrency'
import { WalletInfoDelete } from './WalletInfoDelete'
import { WalletInfoName } from './WalletInfoName'

interface Props {
  className?: string
}

export const WalletInfoCard: FC<Props> = ({ className }) => {
  return (
    <Card className={className} title="Info" action={<WalletInfoDelete />}>
      <WalletInfoName />
      <WalletInfoCurrency />
      <WalletInfoBalance />
      <WalletInfoBalanceInDefaultCurrency />
    </Card>
  )
}
