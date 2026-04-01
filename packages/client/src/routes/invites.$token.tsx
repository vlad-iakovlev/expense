import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { acceptInvite } from '@/api/invites'
import { Page } from '@/components/layout/Page'
import { Route as IndexRoute } from '@/routes/index'

export const Route = createFileRoute('/invites/$token')({
  component: () => (
    <Page>
      <Page.AuthGuard>
        <RouteComponent />
      </Page.AuthGuard>
    </Page>
  ),
})

const RouteComponent = () => {
  const { token } = Route.useParams()
  const navigate = useNavigate()

  useEffect(() => {
    void (async () => {
      try {
        await acceptInvite({ token })
      } finally {
        void navigate({ to: IndexRoute.to })
      }
    })()
  }, [navigate, token])

  return null
}
