import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { getCurrencies } from '../../../api/client/currencies'
import { createWallet } from '../../../api/client/wallets'
import { ROUTES } from '../../../constants/routes'
import { formatAmount } from '../../../utils/formatAmount'
import { useWalletsContext } from '../../contexts/Wallets'
import { Card } from '../../ui-kit/Card'

export const WalletsCard: FC = () => {
  const { query, wallets } = useWalletsContext()

  const router = useRouter()

  const goToWallet = useCallback(
    async (walletId: string) => {
      await router.push(ROUTES.WALLET(walletId))
    },
    [router]
  )

  const handleCreateWallet = useCallback(async () => {
    if (!query.groupId) return

    const { currencies } = await getCurrencies()

    const { wallet } = await createWallet({
      groupId: query.groupId,
      name: 'Untitled',
      currencyId: currencies.find((c) => c.name === 'USD')?.id || '',
    })

    await goToWallet(wallet.id)
  }, [goToWallet, query.groupId])

  if (!query.groupId && !wallets.length) {
    return null
  }

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

      {query.groupId ? (
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
