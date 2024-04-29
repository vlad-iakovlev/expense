import { useMemo } from 'react'
import { OperationsListCard } from '@/components/cards/OperationsList/index.jsx'
import { StatisticsCard } from '@/components/cards/Statistics/index.jsx'
import { WalletInfoCard } from '@/components/cards/WalletInfo/index.jsx'
import { Breadcrumbs } from '@/components/common/Breadcrumbs.jsx'
import { Columns } from '@/components/common/Columns.jsx'
import { Title } from '@/components/common/Title.jsx'
import { NextHead } from '@/components/next/Head.js'
import { ROUTES } from '@/constants/routes.js'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'

interface Props {
  walletId: string
}

export const Wallet = ({ walletId }: Props) => {
  const { wallet } = useWallet({ walletId })

  const walletName = `${wallet.name} ${wallet.currency.symbol}`

  const parents = useMemo(
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
      <NextHead>
        <title>{`Expense > ${walletName}`}</title>
      </NextHead>

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
