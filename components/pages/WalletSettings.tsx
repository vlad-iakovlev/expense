import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { useWallet } from '../../contexts/RootStore/hooks/useWallet.ts'
import { WalletSettingsGeneralCard } from '../cards/WalletSettingsGeneral/WalletSettingsGeneral.tsx'
import { NextHead } from '../next/Head.ts'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

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
