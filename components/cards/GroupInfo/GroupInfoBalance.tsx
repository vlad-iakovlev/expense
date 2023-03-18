import { FC, useMemo } from 'react'
import { useGroupContext } from '../../contexts/Group'
import { useWalletsContext } from '../../contexts/Wallets'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

export const GroupInfoBalance: FC = () => {
  const { groupResponse } = useGroupContext()
  const { walletsResponse } = useWalletsContext()

  const amount = useMemo(() => {
    if (!groupResponse || !walletsResponse) {
      return 0
    }

    return walletsResponse.wallets.reduce<number>((acc, wallet) => {
      return (
        acc +
        wallet.balance *
          (groupResponse.group.defaultCurrency.rate / wallet.currency.rate)
      )
    }, 0)
  }, [groupResponse, walletsResponse])

  if (!groupResponse || !walletsResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={amount}
          currency={groupResponse.group.defaultCurrency}
        />
      }
    >
      Balance
    </Card.Text>
  )
}
