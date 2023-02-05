import Head from 'next/head'
import { FC, useCallback } from 'react'
import { updateWallet } from '../../api/client/wallets'
import { ROUTES } from '../../constants/routes'
import { OperationsCard } from '../cards/Operations'
import { WalletInfoCard } from '../cards/WalletInfo'
import { useWalletContext } from '../contexts/Wallet'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Wallet: FC = () => {
  const { wallet, mutateWallet } = useWalletContext()

  const handleNameChange = useCallback(
    async (name: string) => {
      await updateWallet({
        walletId: wallet.id,
        name,
      })

      await mutateWallet()
    },
    [mutateWallet, wallet.id]
  )

  return (
    <>
      <Head>
        <title>{`Expense > ${wallet.name} ${wallet.currency.name}`}</title>
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

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:break-inside-avoid [&>*]:mb-6">
        <OperationsCard />
        <WalletInfoCard />
      </div>
    </>
  )
}
