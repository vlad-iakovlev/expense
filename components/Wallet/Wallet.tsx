import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { OperationsCard } from '../cards/Operations'
import { WalletInfoCard } from '../cards/WalletInfo'
import { useWalletContext } from '../contexts/Wallet'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'

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

      <Columns>
        <WalletInfoCard />
        <OperationsCard />
      </Columns>
    </>
  )
}
