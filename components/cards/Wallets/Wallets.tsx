import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { getCurrencies } from '../../../api/client/currencies'
import { createWallet } from '../../../api/client/wallets'
import { ROUTES } from '../../../constants/routes'
import { useWalletsContext } from '../../contexts/Wallets'
import { Amount } from '../../ui-kit/Amount'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'

export const WalletsCard: FC = () => {
  const router = useRouter()
  const { walletsQuery, wallets } = useWalletsContext()

  const goToWallet = useCallback(
    async (walletId: string) => {
      await router.push(ROUTES.WALLET(walletId))
    },
    [router]
  )

  const handleCreate = useCallback(async () => {
    if (!walletsQuery.groupId) return

    const { currencies } = await getCurrencies()

    const { wallet } = await createWallet({
      groupId: walletsQuery.groupId,
      name: 'Untitled',
      currencyId: currencies.find((c) => c.name === 'USD')?.id || '',
    })

    await goToWallet(wallet.id)
  }, [goToWallet, walletsQuery.groupId])

  if (!walletsQuery.groupId && !wallets.length) {
    return null
  }

  return (
    <Card>
      <Card.Title
        title="Wallets"
        action={
          walletsQuery.groupId ? (
            <Button
              rounded
              size="sm"
              iconStart={<PlusIcon />}
              onClick={handleCreate}
            />
          ) : undefined
        }
      />

      {wallets.length ? <Card.Divider /> : null}

      {wallets.map((wallet) => (
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
    </Card>
  )
}
