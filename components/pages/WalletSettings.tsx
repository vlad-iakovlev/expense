import { useMemo } from 'react'
import { WalletSettingsGeneralCard } from '@/components/cards/WalletSettingsGeneral/WalletSettingsGeneral.jsx'
import { NextHead } from '@/components/next/Head.js'
import { Breadcrumbs } from '@/components/ui-kit/Breadcrumbs/Breadcrumbs.jsx'
import { Columns } from '@/components/ui-kit/Columns/Columns.jsx'
import { Title } from '@/components/ui-kit/Title/Title.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'

interface Props {
  walletId: string
}

export const WalletSettings = ({ walletId }: Props) => {
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
      <NextHead>
        <title>{`Expense > ${walletName} > Settings`}</title>
      </NextHead>

      <Breadcrumbs parents={parents} />
      <Title title="Settings" />

      <Columns>
        <WalletSettingsGeneralCard walletId={walletId} />
      </Columns>
    </>
  )
}
