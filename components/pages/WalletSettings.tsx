import Head from 'next/head'
import React from 'react'
import { WalletSettingsGeneralCard } from '@/cards/WalletSettingsGeneral/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { ROUTES } from '@/constants/routes'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'

interface WalletSettingsProps {
  walletId: string
}

export const WalletSettings = ({ walletId }: WalletSettingsProps) => {
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
      {
        href: ROUTES.WALLET(walletId),
        title: `${wallet.name} ${wallet.currency.symbol}`,
      },
    ],
    [
      wallet.currency.symbol,
      wallet.group.id,
      wallet.group.name,
      wallet.name,
      walletId,
    ],
  )

  return (
    <>
      <Head>
        <title>{`Expense > ${walletName} > Settings`}</title>
      </Head>

      <Breadcrumbs parents={parents} />
      <Title title="Settings" />

      <Columns>
        <WalletSettingsGeneralCard walletId={walletId} />
      </Columns>
    </>
  )
}
