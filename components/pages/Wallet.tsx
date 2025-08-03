import Head from 'next/head'
import React from 'react'
import { OperationsListCard } from '@/cards/OperationsList/index'
import { StatisticsCard } from '@/cards/Statistics/index'
import { WalletInfoCard } from '@/cards/WalletInfo/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { ROUTES } from '@/constants/routes'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'

interface WalletProps {
  walletId: string
}

export const Wallet = ({ walletId }: WalletProps) => {
  const { wallet } = useWallet({ walletId })

  const walletName = `${wallet.name} ${wallet.currency.symbol}`

  const parents = React.useMemo(
    () => [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      {
        href: ROUTES.GROUP(wallet.group.id),
        title: wallet.group.name,
      },
    ],
    [wallet.group.id, wallet.group.name],
  )

  return (
    <>
      <Head>
        <title>{`Expense > ${walletName}`}</title>
      </Head>

      <Breadcrumbs parents={parents} />
      <Title title={walletName} />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
        <WalletInfoCard walletId={walletId} />
        <OperationsListCard
          className="md:max-lg:row-span-full"
          walletId={walletId}
        />
        <StatisticsCard
          className="md:max-lg:col-start-1 md:max-lg:row-start-2"
          walletId={walletId}
        />
      </Columns>
    </>
  )
}
