import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { OperationsCard } from '../cards/Operations'
import { StatisticsCard } from '../cards/Statistics'
import { WalletInfoCard } from '../cards/WalletInfo'
import { useWalletContext } from '../contexts/Wallet'
import { Breadcrumbs, BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'

export const Wallet: FC = () => {
  const { walletResponse } = useWalletContext()

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      ...(walletResponse
        ? [
            {
              href: ROUTES.GROUP(walletResponse.wallet.group.id),
              title: walletResponse.wallet.group.name,
            },
          ]
        : []),
    ]
  }, [walletResponse])

  return (
    <>
      <Head>
        <title>
          {walletResponse
            ? `Expense > ${walletResponse.wallet.name} ${walletResponse.wallet.currency.name}`
            : 'Loading...'}
        </title>
      </Head>

      {walletResponse ? (
        <Breadcrumbs
          title={`${walletResponse.wallet.name} ${walletResponse.wallet.currency.name}`}
          parents={parents}
        />
      ) : (
        <BreadcrumbSkeleton withParent />
      )}

      <Columns className="md:grid-rows-[auto_1fr] lg:grid-rows-none">
        <WalletInfoCard className="row-start-1 col-start-1" />
        <OperationsCard className="row-start-2 col-start-1 lg:row-start-1 lg:col-start-2" />
        <StatisticsCard className="row-start-3 col-start-1 md:row-start-1 md:row-span-2 md:col-start-2 lg:row-span-1 lg:col-start-3" />
      </Columns>
    </>
  )
}
