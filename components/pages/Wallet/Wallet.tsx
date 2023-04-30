import { FC, useMemo } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { OperationsCard } from '../../cards/Operations/Operations.tsx'
import { StatisticsCard } from '../../cards/Statistics/Statistics.tsx'
import { WalletInfoCard } from '../../cards/WalletInfo/WalletInfo.tsx'
import { Breadcrumbs } from '../../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../../ui-kit/Columns/Columns.tsx'
import { NextHead } from '../../ui-kit/NextHead/NextHead.ts'

interface Props {
  walletId: string
}

export const Wallet: FC<Props> = ({ walletId }) => {
  const { wallet } = useWallet({ walletId })

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
        <title>{`Expense > ${wallet.name} ${wallet.currency.name}`}</title>
      </NextHead>

      <Breadcrumbs
        title={`${wallet.name} ${wallet.currency.name}`}
        parents={parents}
      />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
        <WalletInfoCard walletId={walletId} />
        <OperationsCard walletId={walletId} />
        <StatisticsCard className="md:row-span-full" walletId={walletId} />
      </Columns>
    </>
  )
}
