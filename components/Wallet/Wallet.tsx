import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { OperationsCard } from '../cards/Operations/Operations.tsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.tsx'
import { WalletInfoCard } from '../cards/WalletInfo/WalletInfo.tsx'
import { useWalletContext } from '../contexts/Wallet.tsx'
import { NextHead } from '../next/Head.ts'
import { BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs/BreadcrumbSkeleton.tsx'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'

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
      <NextHead>
        <title>
          {walletResponse
            ? `Expense > ${walletResponse.wallet.name} ${walletResponse.wallet.currency.name}`
            : 'Loading...'}
        </title>
      </NextHead>

      {walletResponse ? (
        <Breadcrumbs
          title={`${walletResponse.wallet.name} ${walletResponse.wallet.currency.name}`}
          parents={parents}
        />
      ) : (
        <BreadcrumbSkeleton withParent />
      )}

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
        <WalletInfoCard />
        <OperationsCard />
        <StatisticsCard className="md:row-span-full" />
      </Columns>
    </>
  )
}
