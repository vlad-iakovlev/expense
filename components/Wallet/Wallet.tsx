import Head from 'next/head'
import { FC, useCallback } from 'react'
import { useSWRConfig } from 'swr'
import { updateWallet } from '../../api/client/wallets'
import { ROUTES } from '../../constants/routes'
import { SWR_KEYS } from '../../constants/swr'
import { OperationsCard } from '../cards/Operations'
import { WalletSettingsCard } from '../cards/WalletSettings'
import { useWalletContext } from '../contexts/Wallet'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Wallet: FC = () => {
  const { mutate } = useSWRConfig()
  const { query, wallet } = useWalletContext()

  const handleNameChange = useCallback(
    async (name: string) => {
      await updateWallet({
        walletId: wallet.id,
        name,
      })

      await mutate(SWR_KEYS.WALLET(query))
    },
    [mutate, query, wallet.id]
  )

  return (
    <>
      <Head>
        <title>{`Expense – ${wallet.group.name} - ${wallet.name}`}</title>
      </Head>

      <Breadcrumbs>
        <Breadcrumbs.Link href={ROUTES.DASHBOARD} title="Dashboard" />
        <Breadcrumbs.Link
          href={ROUTES.GROUP(wallet.group.id)}
          title={wallet.group.name}
        />
        <Breadcrumbs.EditableTitle
          title={wallet.name}
          onChange={handleNameChange}
        />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <OperationsCard />
        <WalletSettingsCard />
      </div>
    </>
  )
}
