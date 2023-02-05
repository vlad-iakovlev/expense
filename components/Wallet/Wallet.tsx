import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { OperationsCard } from '../cards/Operations'
import { WalletInfoCard } from '../cards/WalletInfo'
import { useWalletContext } from '../contexts/Wallet'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Wallet: FC = () => {
  const { wallet } = useWalletContext()

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      {
        href: ROUTES.GROUP(wallet.group.id),
        title: wallet.group.name,
      },
    ]
  }, [wallet.group.id, wallet.group.name])

  return (
    <>
      <Head>
        <title>{`Expense > ${wallet.name} ${wallet.currency.name}`}</title>
      </Head>

      <Breadcrumbs
        title={`${wallet.name} ${wallet.currency.name}`}
        parents={parents}
      />

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:mb-6">
        <WalletInfoCard />
        <OperationsCard />
      </div>
    </>
  )
}
