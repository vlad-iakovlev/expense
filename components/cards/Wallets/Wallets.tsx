import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes'
import { useWalletsContext } from '../../contexts/Wallets'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'
import { WalletsCreate } from './WalletsCreate'

export const WalletsCard: FC = () => {
  const router = useRouter()
  const { walletsResponse, walletsPayload } = useWalletsContext()

  const goToWallet = useCallback(
    async (walletId: string) => {
      await router.push(ROUTES.WALLET(walletId))
    },
    [router]
  )

  if (!walletsPayload.groupId && walletsResponse?.wallets.length === 0) {
    return null
  }

  return (
    <Card>
      <Card.Title
        title="Wallets"
        action={walletsPayload.groupId && <WalletsCreate />}
      />
      {walletsResponse?.wallets.length !== 0 && <Card.Divider />}

      {walletsResponse?.wallets.map((wallet) => (
        <Card.Button
          key={wallet.id}
          end={
            <Amount
              className="font-medium"
              amount={wallet.balance}
              currency={wallet.currency}
            />
          }
          onClick={() => goToWallet(wallet.id)}
        >
          {wallet.name}
        </Card.Button>
      ))}

      {!walletsResponse && (
        <>
          <Card.Skeleton />
          <Card.Skeleton />
          <Card.Skeleton />
          <Card.Skeleton />
          <Card.Skeleton />
          <Card.Skeleton />
        </>
      )}
    </Card>
  )
}
