import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.js'
import { useWallet } from '../../contexts/RootStore/hooks/useWallet.js'
import { OperationsListCard } from '../cards/OperationsList/OperationsList.jsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.jsx'
import { WalletInfoCard } from '../cards/WalletInfo/WalletInfo.jsx'
import { NextHead } from '../next/Head.js'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.jsx'
import { Columns } from '../ui-kit/Columns/Columns.jsx'
import { Title } from '../ui-kit/Title/Title.jsx'

interface Props {
  walletId: string
}

export const Wallet = ({ walletId }: Props) => {
  const { wallet } = useWallet({ walletId })

  const walletName = `${wallet.name} ${wallet.currency.symbol}`

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
