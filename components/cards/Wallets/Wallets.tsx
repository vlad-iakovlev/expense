import { FC } from 'react'
import { useWalletsContext } from '../../contexts/Wallets.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { WalletsCreate } from './WalletsCreate.tsx'
import { WalletsList } from './WalletsList.tsx'

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
      <WalletsList />
    </Card>
  )
}
