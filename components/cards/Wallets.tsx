import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { getCurrencies } from '../../api/client/currencies'
import { createWallet } from '../../api/client/wallets'
import { ClientWallet } from '../../api/types/wallets'
import { ROUTES } from '../../constants/routes'
import { formatAmount } from '../../utils/formatAmount'
import { Card } from '../ui-kit/Card'

interface Props {
  groupId?: string
  wallets: ClientWallet[]
}

export const Wallets: FC<Props> = ({ groupId, wallets }) => {
  const router = useRouter()

  const goToWallet = useCallback(
    async (walletId: string) => {
      await router.push(ROUTES.WALLET(walletId))
    },
    [router]
  )

  const handleCreateWallet = useCallback(async () => {
    if (!groupId) return

    const { currencies } = await getCurrencies()

    const { wallet } = await createWallet({
      groupId,
      name: 'Untitled Wallet',
      currencyId: currencies[0].id,
    })

    await goToWallet(wallet.id)
  }, [goToWallet, groupId])

  return (
    <Card>
      <Card.Title title="Wallets" />

      <Card.Divider />

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

      {groupId ? (
        <Card.Button
          end={<PlusIcon className="w-5 h-5" />}
          onClick={handleCreateWallet}
        >
          Create Wallet
        </Card.Button>
      ) : null}
    </Card>
  )
}
