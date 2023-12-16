import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.js'
import { useWallet } from '../../contexts/RootStore/hooks/useWallet.js'
import { WalletSettingsGeneralCard } from '../cards/WalletSettingsGeneral/WalletSettingsGeneral.jsx'
import { NextHead } from '../next/Head.js'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.jsx'
import { Columns } from '../ui-kit/Columns/Columns.jsx'
import { Title } from '../ui-kit/Title/Title.jsx'

interface Props {
  walletId: string
}

export const WalletSettings = ({ walletId }: Props) => {
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
      {
        href: ROUTES.WALLET(walletId),
        title: `${wallet.name} ${wallet.currency.symbol}`,
      },
    ]
  }, [
    wallet.currency.symbol,
    wallet.group.id,
    wallet.group.name,
    wallet.name,
    walletId,
  ])

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
