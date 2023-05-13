import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { useWallet } from '../../stores/RootStore/hooks/useWallet.ts'
import { OperationsListCard } from '../cards/OperationsList/OperationsList.tsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.tsx'
import { WalletInfoCard } from '../cards/WalletInfo/WalletInfo.tsx'
import { NextHead } from '../next/Head.ts'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

interface Props {
  walletId: string
}

export const Wallet: FC<Props> = ({ walletId }) => {
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
