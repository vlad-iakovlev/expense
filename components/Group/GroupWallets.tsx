import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { GetCurrenciesResponse } from '../../api/currency'
import { CreateWalletBody, CreateWalletResponse } from '../../api/wallet'
import { ClientGroup } from '../../models/group'
import { ClientWallet } from '../../models/wallet'
import { formatAmount } from '../../utils/formatAmount'
import { request } from '../../utils/request'
import { Card } from '../ui-kit/Card'

interface Props {
  group: ClientGroup
  wallets: ClientWallet[]
}

export const GroupWallets: FC<Props> = ({ group, wallets }) => {
  const router = useRouter()

  const handleWalletClick = useCallback(
    async (walletId: string) => {
      await router.push(`/dashboard/${group.id}/${walletId}`)
    },
    [group.id, router]
  )

  const handleCreateWallet = useCallback(async () => {
    const { currencies } = await request.get<GetCurrenciesResponse>(
      '/api/currencies'
    )

    const { wallet } = await request.post<
      CreateWalletBody,
      CreateWalletResponse
    >(`/api/group/${group.id}/wallet`, {
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
          onClick={() => handleWalletClick(wallet.id)}
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
