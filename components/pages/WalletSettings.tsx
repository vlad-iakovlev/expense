import React from 'react'
import { WalletSettingsGeneralCard } from '@/cards/WalletSettingsGeneral/index.jsx'
import { Breadcrumbs } from '@/components/common/Breadcrumbs.jsx'
import { Columns } from '@/components/common/Columns.jsx'
import { Title } from '@/components/common/Title.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'
import { useTitle } from '@/hooks/useTitle.js'

interface WalletSettingsProps {
  walletId: string
}

export const WalletSettings = ({ walletId }: WalletSettingsProps) => {
  const { wallet } = useWallet({ walletId })

  const walletName = `${wallet.name} ${wallet.currency.symbol}`

  useTitle(`Expense > ${walletName} > Settings`)

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
      <Breadcrumbs parents={parents} />
      <Title title="Settings" />

      <Columns>
        <WalletSettingsGeneralCard walletId={walletId} />
      </Columns>
    </>
  )
}
