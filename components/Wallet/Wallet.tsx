import Head from 'next/head'
import { FC } from 'react'
import { ROUTES } from '../../constants/routes'
import { OperationsCard } from '../cards/Operations'
import { WalletInfoCard } from '../cards/WalletInfo'
import { useWalletContext } from '../contexts/Wallet'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Wallet: FC = () => {
  const { wallet } = useWalletContext()

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
        <Breadcrumbs.Title title={`${wallet.name} ${wallet.currency.name}`} />
      </Breadcrumbs>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:mb-6">
        <WalletInfoCard />
        <OperationsCard />
      </div>
    </>
  )
}
