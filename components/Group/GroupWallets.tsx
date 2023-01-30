import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { getCurrencies } from '../../api/client/currencies'
import { createWallet } from '../../api/client/wallets'
import { ClientGroup } from '../../api/types/groups'
import { ClientWallet } from '../../api/types/wallets'
import { formatAmount } from '../../utils/formatAmount'
import { Card } from '../ui-kit/Card'

interface Props {
  group: ClientGroup
  wallets: ClientWallet[]
}

export const GroupWallets: FC<Props> = ({ group, wallets }) => {
  const router = useRouter()

  const goToWallet = useCallback(
    async (walletId: string) => {
      await router.push(`/dashboard/groups/${group.id}/wallets/${walletId}`)
    },
    [group.id, router]
  )

  const handleCreateWallet = useCallback(async () => {
    const { currencies } = await getCurrencies()

    const { wallet } = await createWallet(group.id, {
      name: 'Untitled Wallet',
      currencyId: currencies[0].id,
    })

    await router.push(`/dashboard/${group.id}/${wallet.id}`)
  }, [group.id, router])

  return (
    <Card>
      <Card.Title>Wallets</Card.Title>

      {wallets.map((wallet) => (
        <Card.Button
          key={wallet.id}
          end={
            <div className="font-medium">
              {formatAmount(wallet.balance, wallet.currency)}
            </div>
          }
          onClick={() => goToWallet(wallet.id)}
        >
          {wallet.name}
        </Card.Button>
      ))}

      <Card.Button
        end={<PlusIcon className="w-5 h-5" />}
        onClick={handleCreateWallet}
      >
        Create Wallet
      </Card.Button>
    </Card>
  )
}
