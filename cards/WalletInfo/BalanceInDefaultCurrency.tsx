import { Amount } from '@/components/common/Amount'
import { Card } from '@/components/common/Card/index'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'
import { useWalletBalance } from '@/contexts/RootStore/hooks/useWalletBalance'
import { Decimal } from '@/utils/Decimal'

interface BalanceInDefaultCurrencyProps {
  walletId: string
}

export const BalanceInDefaultCurrency = ({
  walletId,
}: BalanceInDefaultCurrencyProps) => {
  const { wallet } = useWallet({ walletId })
  const { walletBalance } = useWalletBalance({ walletId })

  if (wallet.currency.id === wallet.group.defaultCurrency.id) {
    return null
  }

  return (
    <Card.Item
      label={
        <span>
          Balance in{' '}
          <span aria-label={wallet.group.defaultCurrency.name}>
            {wallet.group.defaultCurrency.symbol}
          </span>
        </span>
      }
      value={
        <Amount
          className="font-medium select-text"
          amount={walletBalance.balance.mul(
            Decimal.fromNumber(
              wallet.group.defaultCurrency.rate / walletBalance.currency.rate,
            ),
          )}
          currency={wallet.group.defaultCurrency}
          showSign="negative"
          hideCurrency
        />
      }
    />
  )
}
