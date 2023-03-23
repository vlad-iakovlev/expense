import { FC } from 'react'
import { ROUTES } from '../../../constants/routes'
import { useWalletsContext } from '../../contexts/Wallets'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'
import { WalletsCreate } from './WalletsCreate'

interface Props {
  className?: string
}

export const WalletsCard: FC<Props> = ({ className }) => {
  const { walletsResponse, walletsPayload } = useWalletsContext()

  if (!walletsPayload.groupId && walletsResponse?.wallets.length === 0) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title
        title="Wallets"
        action={walletsPayload.groupId && <WalletsCreate />}
      />
      {walletsResponse?.wallets.length !== 0 && <Card.Divider />}

      {walletsResponse?.wallets.map((wallet) => (
        <Card.Link
          key={wallet.id}
          end={
            <Amount
              className="font-medium"
              amount={wallet.balance}
              currency={wallet.currency}
            />
          }
          href={ROUTES.WALLET(wallet.id)}
        >
          {wallet.name}
        </Card.Link>
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
