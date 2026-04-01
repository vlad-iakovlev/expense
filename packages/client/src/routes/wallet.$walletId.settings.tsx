import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { WalletSettingsGeneralCard } from '@/components/cards/WalletSettingsGeneral'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { useOptionalWallet } from '@/contexts/RootStore/hooks/useWallet'

export const Route = createFileRoute('/wallet/$walletId/settings')({
  component: () => (
    <Page>
      <Page.AuthGuard>
        <Page.StoreGuard>
          <RouteComponent />
        </Page.StoreGuard>
      </Page.AuthGuard>
    </Page>
  ),
})

const RouteComponent = () => {
  const { walletId } = Route.useParams()
  const { wallet } = useOptionalWallet({ walletId })
  const navigate = useNavigate()

  useEffect(() => {
    if (!wallet) void navigate({ to: '/' })
  }, [navigate, wallet])

  if (!wallet) return null

  return (
    <>
      <Breadcrumbs
        parents={[
          {
            to: '/',
            title: 'Dashboard',
          },
          {
            to: '/group/$groupId',
            params: { groupId: wallet.group.id },
            title: wallet.group.name,
          },
          {
            to: '/wallet/$walletId',
            params: { walletId },
            title: `${wallet.name} ${wallet.currency.symbol}`,
          },
        ]}
      />
      <Title title="Settings" />

      <Columns>
        <WalletSettingsGeneralCard walletId={walletId} />
      </Columns>
    </>
  )
}
