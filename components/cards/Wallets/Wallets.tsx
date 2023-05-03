import { FC } from 'react'
import { useWallets } from '../../../stores/RootStore/hooks/useWallets.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { WalletsCreate } from './WalletsCreate.tsx'
import { WalletsList } from './WalletsList.tsx'

interface Props {
  className?: string
  groupId: string
}

export const WalletsCard: FC<Props> = ({ className, groupId }) => {
  const { walletIds } = useWallets({ groupId })

  return (
    <Card className={className}>
      <Card.Title
        title="Wallets"
        action={<WalletsCreate groupId={groupId} />}
      />

      {walletIds.length > 0 && (
        <>
          <Card.Divider />
          <WalletsList walletIds={walletIds} groupId={groupId} />
        </>
      )}
    </Card>
  )
}
